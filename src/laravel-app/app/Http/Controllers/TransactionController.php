<?php

namespace App\Http\Controllers;

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
    protected $basketController;
    private array $validationRules = [
        'location_id' => 'nullable|int|exists:locations,id',
    ];

    /**
     * Inject dependencies.
     */
    public function __construct(SelectedProductController $basketController)
    {
        $this->basketController = $basketController;
    }

    /**
     * Show all transactions.
     */
    public function index_all()
    {
        return TransactionResource::collection(Transaction::all())->each(function ($transaction) {
            $transaction->with_transactor();
        });
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
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function purchase(Request $request)
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Get the current user ID
        $userId = Auth::user()->id;
        $info = $validator->validated();
        $info["transactor_id"] = $userId;

        // Get selected products along with their amounts from SelectedProducts model
        $selectedProducts = SelectedProductResource::collection(SelectedProducts::where('user_id', $userId)->get());

        // Return forbidden if no products are selected
        if ($selectedProducts->isEmpty()) {
            return response()->json(['error' => 'Forbidden: No products in the basket.'], 403); // Forbidden
        }

        $total_price = 0;
        $product_names = [];

        // Calculate total price based on selected products and their amounts
        foreach ($selectedProducts as $selectedProduct) {
            $product = new ProductResource(Product::find($selectedProduct->product_id));

            if ($product) {
                // Use discount price if available, otherwise use the regular price
                $price = $product->discount_pricing ?? $product->pricing;
                $amount = $selectedProduct->amount; // Get the amount for the selected product

                // Calculate total price for this product
                $total_price += $price * $amount;

                // Add product details to message
                $product_names[] = $product->display_name . ' x' . $amount . ' ($' . number_format($price * $amount, 2) . ')';
            }
        }

        // Generate a message listing all product names, quantities, and total price
        $message = "Total price calculated: $" . number_format($total_price, 2) . ". Products: " . implode(", ", $product_names);

        // Create the transaction
        $transaction_data = [
            'total_pricing' => $total_price,
            'check_content' => $message,
        ];

        // Create a new transaction
        $transaction = Transaction::create(array_merge($transaction_data, $info));

        // Include location relation and return the created transaction
        $transaction->load('location');

        // Hide unnecessary fields from the transaction
        $transaction->makeHidden(['location_id', 'transactor_id', 'updated_at']);

        // Hide unnecessary fields from the location if it exists
        if ($transaction->location) {
            $transaction->location->makeHidden(['created_at', 'updated_at', 'creator_id']);
        }

        // Clear the user's basket after successful purchase
//        $user = Auth::user();
//        $user->clear_basket();
        $this->basketController->clear_basket();

        return response()->json($transaction, 202); // Request accepted
    }
}
