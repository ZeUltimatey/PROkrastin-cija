<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Product;
use App\Models\Review;
use App\Models\Attachment;
use App\Models\Images;
use App\Services\PaginateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
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
    public function show(Request $request, int $product_id)
    {
        // Fetch the review that matches the given id and join with the users table
        $review_models = Review::where('product_id', $product_id)->get();
        $reviews = ReviewResource::collection($review_models);

        $paginate = new PaginateService($request, [$reviews]);
        $per_page = $request->get('per_page', 12);
        $page = $request->get('page', 1);

        return $paginate->get_page($page, $per_page);
    }

    /**
     * Create a review.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function store(ReviewRequest $request, int $product_id)
    {
        // Sense
        $review_data = $request->all();

        // Check if the product exists
        $product_model = Product::find($product_id);
        if ($product_model == null) { return response()->json(['error' => 'Product not found.'], 404); } // Not found

        // Append the current user id and product id
        $userId = Auth::user()->id;
        $review_data["reviewer_id"] = $userId;
        $review_data["product_id"] = $product_id;

        // Create review if everything is correct
        Review::create($review_data);
        return response()->json(null, 201); // Content created
    }

    /**
     * Remove review.
     */
    public function destroy(int $id)
    {
        // Find and delete review by id
        $review_model = Review::find($id);
        if ($review_model == null) { return response()->json(null, 404); } // Not found

        // Delete the review
        $review_model->delete();
        return response()->json(null, 204); // No content
    }

    public function addImages(Request $request, int $id)
    {
        // Validate the images array and each individual image
        $validator = Validator::make($request->all(), [
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:4096', // Each image must meet these criteria
            'images' => 'required|array|min:1', // Ensure at least one image is uploaded
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }
    
        $uploadedImages = []; // To store details of uploaded images
        $review =Review::where('id', $id)->first();
        // if user doesn't have an attachment_id create a new one
        if (!$review->attachment) {
            $review->attachment()->create();  
            $review->load('attachment');
        } 
    
        foreach ($request->file('images') as $image) {
            // Save the image with the attachment ID
            $path = $image->store('images/breeds', 'public');
            $image = new Images();
            $image->url = Storage::url($path);
            $image->attachment_id = $review->attachment->id;
            $image->save();
    
            $uploadedImages[] = $image; // Add to the result list
        }
    
        return response()->json([
            'message' => 'Images uploaded successfully.',
            'images' => $uploadedImages,
        ]);
        }
}
