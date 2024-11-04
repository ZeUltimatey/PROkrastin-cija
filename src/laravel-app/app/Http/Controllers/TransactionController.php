<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\SelectedProducts;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    private array $validationRules = [
        'location_id' => 'nullable|int|exists:locations,id',
    ];

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
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(): JsonResponse
    {
        // Get the authenticated user's ID
        $userId = Auth::user()->id;

        // Fetch all transactions where transactor_id matches the authenticated user's ID
        $transactions = Transaction::with(['location' => function($query) {
            $query->select('id', 'city', 'street', 'apartment_number', 'zip_code');
        }])
            ->where('transactor_id', $userId)
            ->get();

        foreach ($transactions as $transaction) {
            $transaction->makeHidden(['transactor_id', 'location_id', 'updated_at']);
        }

        return response()->json($transactions, 200); // OK
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
        $selectedProducts = SelectedProducts::where('user_id', $userId)->get();

        // Return forbidden if no products are selected
        if ($selectedProducts->isEmpty()) {
            return response()->json(['error' => 'Forbidden: No products in the basket.'], 403);
        }

        $totalPrice = 0;
        $productNames = [];

        // Calculate total price based on selected products and their amounts
        foreach ($selectedProducts as $selectedProduct) {
            $product = Product::find($selectedProduct->product_id);

            if ($product) {
                // Use discount price if available, otherwise use the regular price
                $price = $product->discount_pricing ?? $product->pricing;
                $amount = $selectedProduct->amount; // Get the amount for the selected product

                // Calculate total price for this product
                $totalPrice += $price * $amount;

                // Add product details to message
                $productNames[] = $product->display_name . ' x' . $amount . ' ($' . number_format($price * $amount, 2) . ')';
            }
        }

        // Generate a message listing all product names, quantities, and total price
        $message = "Total price calculated: $" . number_format($totalPrice, 2) . ". Products: " . implode(", ", $productNames);

        // Create the transaction
        $transactionData = [
            'total_pricing' => $totalPrice,
            'check_content' => $message,
        ];

        // Create a new transaction
        $transaction = Transaction::create(array_merge($transactionData, $info));

        // Include location relation and return the created transaction
        $transaction->load('location');

        // Hide unnecessary fields from the transaction
        $transaction->makeHidden(['location_id', 'transactor_id', 'updated_at']);

        // Hide unnecessary fields from the location if it exists
        if ($transaction->location) {
            $transaction->location->makeHidden(['created_at', 'updated_at', 'creator_id']);
        }

        // Clear the user's basket after successful purchase
        $user = Auth::user();
        $user->clear_basket();

        return response()->json($transaction, 201); // Content created
    }
}
