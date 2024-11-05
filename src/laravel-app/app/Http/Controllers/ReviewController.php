<?php

namespace App\Http\Controllers;

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
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index_all(): JsonResponse
    {
        // Fetch all reviews with the associated products and reviewers
        $reviews = Review::with([
            'product' => function($query) {
                $query->select('id', 'display_name', 'pricing', 'discount_pricing');
            },
            'reviewer' => function($query) {
                $query->select('id', 'display_name', 'image_url', 'user_role', 'deactivated');
            }
        ])->get();

        foreach ($reviews as $review) { $review->makeHidden(['reviewer_id', 'product_id', 'updated_at']); }
        return response()->json($reviews, 200); // OK
    }

    /**
     * Show reviews for a product.
     *
     * @param int $product_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $product_id)
    {
        // Fetch the review that matches the given id and join with the users table
        $reviews = Review::with(['reviewer' => function($query) {
            // Select only the fields you want from the users table
            $query->select('id', 'display_name', 'image_url', 'user_role', 'deactivated'); // Adjust fields to include as needed
        }])
            ->where('product_id', $product_id)
            ->get();

        // Optionally hide the product_id field in each review if still included
        foreach ($reviews as $review) {
            $review->makeHidden(['reviewer_id', 'product_id', 'updated_at']);
        }

        return response()->json($reviews, 200); // OK, return the matching reviews
    }

    /**
     * Create a review.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, int $product_id): JsonResponse
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
        $info = $validator->validated();
        $info["reviewer_id"] = $userId;
        $info["product_id"] = $product_id;

        // Create review if everything is correct
        $review = Review::create($info);

        // Fetch all reviews with the associated products and reviewers
        $review = Review::with([
            'product' => function($query) {
                $query->select('id', 'display_name', 'pricing', 'discount_pricing');
            },
            'reviewer' => function($query) {
                $query->select('id', 'display_name', 'image_url', 'user_role', 'deactivated');
            }
        ])->find($review->id);

        $review->makeHidden(['reviewer_id', 'product_id', 'updated_at']);
        return response()->json($review, 201); // Content created
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
