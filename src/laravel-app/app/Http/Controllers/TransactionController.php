<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SelectedProductResource;
use App\Http\Controllers\SelectedProductController;
use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\SelectedProducts;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    protected $basket_controller;

    /**
     * Inject dependencies.
     */
    public function __construct(SelectedProductController $basketController)
    {
        $this->basket_controller = $basketController;
    }

    /**
     * Show all transactions.
     */
    public function index_all(Request $request)
    {
        // Fetch all transactions
//        return TransactionResource::collection(Transaction::all())->each(function ($transaction) {
//            $transaction->with_transactor();
//        });

        // Initialize a query builder for the Product model
//        $query = Transaction::query();
        $query = Transaction::query()
            ->select('transactions.*')
            ->leftJoin('users', 'transactions.transactor_id', '=', 'users.id')
            ->leftJoin('locations', 'transactions.location_id', '=', 'locations.id');

        // Filter by price range (if provided)
        if ($request->has('min') || $request->has('max')) {
            $query->where(function ($q) use ($request) {
                if ($request->has('min')) {
                    $q->where(function ($subQuery) use ($request) {
                        $subQuery->where('total_pricing', '>=', $request->min);
                    });
                }
                if ($request->has('max')) {
                    $q->where(function ($subQuery) use ($request) {
                        $subQuery->where('total_pricing', '<=', $request->max);
                    });
                }
            });
        }

        // Filter by keyword in display_name or description (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $query->where(function($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(users.name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(users.surname, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(check_content, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        // Sort by price if 'price_sort' parameter is provided
        if ($request->has('total_sort') && in_array(strtolower($request->total_sort), ['asc', 'desc'])) {
            $sortOrder = strtolower($request->total_sort) === 'asc' ? 'asc' : 'desc';

            // Sorting by discounted price first if it exists, else regular price using CASE WHEN
            $query->orderByRaw("total_pricing " . $sortOrder);
        }

        // Set the default number of records per page to 12 if not provided
        $perPage = $request->get('per_page', 12);  // Default to 12 records per page

        // Get paginated results
        $products = $query->paginate($perPage);

        // Append current request parameters to pagination links
        $products->appends($request->except('page'));

        // Return paginated products as a resource collection
        return TransactionResource::collection($products);
    }

    /**
     * Show transactions for a user.
     */
    public function show()
    {
        // Get the authenticated user's ID
        $userId = Auth::user()->id;

        // Fetch all transactions where transactor_id matches the authenticated user's ID
        $transactions = Transaction::where('transactor_id', $userId)->get();
        return TransactionResource::collection($transactions);
    }

    /**
     * Create a transaction.
     */
    public function purchase(TransactionRequest $request)
    {
        // Get the current user ID
        $userId = Auth::user()->id;
        $transaction_data = $request->all();
        $transaction_data["transactor_id"] = $userId;

        // Get selected products along with their amounts from SelectedProducts model
        $selected_products = SelectedProductResource::collection(SelectedProducts::where('user_id', $userId)->get());

        // Return forbidden if no products are selected
        if ($selected_products->isEmpty()) {
            return response()->json(['error' => 'Forbidden: No products in the basket.'], 403); // Forbidden
        }

        // Initialize transaction information
        $total_price = 0;
        $product_names = [];

        // Calculate total price based on selected products and their amounts
        foreach ($selected_products as $basket_item) {
            $product = ProductResource::find($basket_item->product_id);
            if ($product->resource == null) { continue; }

            // Use discount price if available, otherwise use the regular price
            $price = $product->discount_pricing ?? $product->pricing;
            $amount = $basket_item->amount; // Get the amount for the selected product

            // Calculate total price for this product
            $total_price += $price * $amount;

            // Add product details to message
            $product_names[] = $amount . 'x ' . $product->display_name . '\t' . number_format($price * $amount, 2) . ' EUR';
        }

        // Generate a message listing all product names, quantities, and total price
        $message = implode("\n", $product_names) .
            "\n------------------------------------\n" .
            "Total price: " .
            number_format($total_price, 2) .
            " EUR\n------------------------------------\n" .
            "THANK YOU FOR SHOPPING AT MURRĀTAVA!";

        // Create the transaction
        $transaction_data['total_pricing'] = $total_price;
        $transaction_data['check_content'] = $message;
        $new_transaction_model = Transaction::create($transaction_data);

        // Clear the user's basket after a successful purchase
        $this->basket_controller->clear_basket();
        return new TransactionResource($new_transaction_model);
    }
}
