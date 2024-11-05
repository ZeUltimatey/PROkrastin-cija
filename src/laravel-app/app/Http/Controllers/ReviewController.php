<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    private array $validationRules = [
        'content' => 'required|string|max:65535',
        'rating' => 'required|int|min:0|max:10'
    ];

    /**
     * Show all reviews.
     */
    public function index_all()
    {
        // Fetch all reviews with the associated products and reviewers
        return ReviewResource::collection(Review::all())->each(function ($review) {
            $review->with_product();
        });
    }

    /**
     * Show reviews for a product.
     *
     * @param int $product_id
     */
    public function show(int $product_id)
    {
        // Fetch the review that matches the given id and join with the users table
        $reviews = Review::where('product_id', $product_id)->get();
        return ReviewResource::collection($reviews);
    }

    /**
     * Create a review.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function store(Request $request, int $product_id)
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
        $review_info = $validator->validated();
        $review_info["reviewer_id"] = $userId;
        $review_info["product_id"] = $product_id;

        // Create review if everything is correct
        $review = Review::create($review_info);

        // Fetch all reviews with the associated products and reviewers
        $review = Review::find($review->id);
        return new ReviewResource($review);
    }

    /**
     * Remove review.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        // Find and delete review by id
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(true, 202); // Request accepted
    }
}
