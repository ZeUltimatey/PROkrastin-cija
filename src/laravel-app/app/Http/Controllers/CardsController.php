<?php

namespace App\Http\Controllers;

use App\Models\CardInformation;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CardInformationResource;

class CardsController extends Controller
{
    private array $validationRules = [
        'card_number'     => 'required|string|digits:16',
        'expiration_date' => 'required|date_format:m/y|after:today',
        'cvc_number'      => 'nullable|string|digits:3',
        'cardOwnerName'   => 'required|string|max:255',
        'cardOwnerSurname'    => 'required|string|max:255',
    ];

    /**
     * Show all card information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index_all(): JsonResponse
    {
        // Fetch all card information
        $cardInformation = CardInformation::all();

        return response()->json($cardInformation);
    }

    /**
     * Show all card information for the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get the ID of the authenticated user
        $userId = Auth::user()->id;

        // Fetch all card information that belong to the authenticated user
        $cardInformation = CardInformationResource::collection(CardInformation::all()->where('cardholder_id', $userId));

        // Return the filtered records as a JSON response
        return response()->json($cardInformation);
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
        $cardInformation = CardInformation::find($id);

        if (!$cardInformation) { return response()->json(null, 404); } // Not found
        $cardInformation->makeHidden(['cardholder_id']);

        // Check if the user owns the card
        $userId = Auth::user()->id;
        if ($cardInformation->cardholder_id != $userId) { return response()->json(null, 403); } // Forbidden

        if ($cardInformation) { return response()->json($cardInformation, 200); } // OK
        else { return response()->json(null, 404); } // Not found
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
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Append the current user id
        $userId = Auth::user()->id;
        $cardInformation = $validator->validated();
        $cardInformation["cardholder_id"] = $userId;

        // Create card information record if everything is correct
        $card = CardInformation::create($cardInformation);
        return response()->json($card, 201); // Content created
    }

    /**
     * Update card information.
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
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Update and return card information if everything is correct
        $cardInformation = CardInformation::findOrFail($id);

        // Check if the user owns the card
        $userId = Auth::user()->id;
        if ($cardInformation->cardholder_id != $userId) { return response()->json(null, 403); } // Forbidden

        $cardInformation->update($validator->validated());
        $cardInformation->makeHidden(['cardholder_id']);
        return response()->json($cardInformation, 202); // Request accepted
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
        return response()->json(true, 202); // Request accepted
    }
}
