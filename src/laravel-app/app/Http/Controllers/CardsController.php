<?php

namespace App\Http\Controllers;

use App\Models\CardInformation;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CardsController extends Controller
{
    private array $validationRules = [
        'cardholder_id'   => 'required|exists:users,user_id',
        'card_number'     => 'required|string|digits:16|unique:cards,card_number',
        'expiration_date' => 'required|date_format:m/y|after:today',
        'cvc_number'      => 'nullable|string|digits:3',
        'card_name'       => 'required|string|max:255',
    ];

    /**
     * Show all card information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(CardInformation::all());
    }

    /**
     * Show one card information.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        // Find card information by id
        $card = CardInformation::find($id);

        if ($card) { return response()->json($card, 200); }
        else { return response()->json('Card information not found', 404); }
    }

    /**
     * Store new card information.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid fr
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422);
        }

        // Create card information record if everything is correct
        $card = CardInformation::create($request->validated());
        return response()->json($card, 201);
    }

    /**
     * Update the information of a product.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid fr
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422);
        }

        // Update and return card information if everything is correct
        $product = CardInformation::findOrFail($id);
        $product->update($validator->validated());
        return response()->json($product, 201);
    }

    /**
     * Remove card information.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        // Find and delete card information by id
        $card = CardInformation::findOrFail($id);
        $card->delete();
        return response()->json('Card deleted successfully', 200);
    }
}
