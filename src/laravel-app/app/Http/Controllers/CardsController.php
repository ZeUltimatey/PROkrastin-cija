<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Models\CardInformation;

class CardsController extends Controller
{
    public function index()
    {
        return response()->json(CardInformation::all());
    }

    public function show(string $id)
    {
        $card = CardInformation::find($id);

        if ($card) {
            return response()->json($card, 200);
        } else {
            return response()->json('Card information not found', 404);
        }
    }

    public function store(StoreCardRequest $request)
    {
        $card = CardInformation::create($request->validated());
        return response()->json($card, 201);
    }

    public function update(UpdateCardRequest $request, string $id)
    {
        $card = CardInformation::findOrFail($id);
        $card->update($request->validated());
        return response()->json($card, 200);
    }

    public function destroy(string $id)
    {
        $card = CardInformation::findOrFail($id);
        $card->delete();
        return response()->json(['message' => 'Card deleted successfully'], 200);
    }
}
