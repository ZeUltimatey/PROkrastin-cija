<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductSearchRequest;
use App\Http\Resources\UserResource;
use App\Models\Product;
use App\Models\Attachment;
use App\Models\Images;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;
use App\Http\Resources\ProductResource;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class ProductController extends Controller
{
    /**
     * Show all products.
     */
    public function index(ProductSearchRequest $request)
    {
        // Sense logged user
        $user = new UserResource(auth('sanctum')->user());

        // Initialize a query builder for the Product model
        $query = Product::query()
            ->select('products.*')
            ->leftJoin('cats', 'products.id', '=', 'cats.id')
            ->leftJoin('cat_breeds', 'cats.breed_id', '=', 'cat_breeds.id');

        // Filter by multiple product_types (if provided as a comma-separated string)
        if ($request->filled('product_type')) {
            $productTypes = explode(',', $request->product_type);
            $query->whereIn('product_type', array_unique($productTypes));
        }

        // Filter by price range (if provided)
        if ($request->has('min_price') || $request->has('max_price')) {
            $query->where(function ($q) use ($request) {
                if ($request->has('min_price')) {
                    $q->where(function ($subQuery) use ($request) {
                        $subQuery->where('discount_pricing', '>=', $request->min_price)
                            ->orWhere('pricing', '>=', $request->min_price);
                    });
                }
                if ($request->has('max_price')) {
                    $q->where(function ($subQuery) use ($request) {
                        $subQuery->where('discount_pricing', '<=', $request->max_price)
                            ->orWhere('pricing', '<=', $request->max_price);
                    });
                }
            });
        }

        // Filter by keyword in display_name or description (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $query->where(function ($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(products.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(products.description, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(cat_breeds.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        if ($user->resource != null && $user->display_only_available) {
            $query->where('stock', '>=', 1);
        }
//        if ($request->has('available_only') && strtolower($request->available_only) === 'true') {
//            $query->where('stock', '>=', 1);
//        }

        // Sort by price if 'price_sort' parameter is provided
        if ($request->has('price_sort') && in_array(strtolower($request->price_sort), ['asc', 'desc'])) {
            $sortOrder = strtolower($request->price_sort) === 'asc' ? 'asc' : 'desc';

            // Sorting by discounted price first if it exists, else regular price using CASE WHEN
            $query->orderByRaw("(CASE WHEN discount_pricing IS NOT NULL THEN discount_pricing ELSE pricing END) " . $sortOrder);
        } else if ($user->resource != null && $user->display_lowest_price) {
            $query->orderByRaw("(CASE WHEN discount_pricing IS NOT NULL THEN discount_pricing ELSE pricing END) asc");
        }

        // Set the default number of records per page to 12 if not provided
        $perPage = $request->get('per_page', 12);  // Default to 12 records per page

        // Get paginated results
        $products = $query->paginate($perPage);

        // Append current request parameters to pagination links
        $products->appends($request->except('page'));

        // Return paginated products as a resource collection
        return ProductResource::collection($products);
    }

    /**
     * Show a singular product.
     *
     * @param int $id
     */
    public function show(int $id)
    {
        // Find the product by id
        $product = ProductResource::find($id);
        if ($product->resource == null) { return response()->json(null, 404); } // Not found

        // Return the product
        return $product;
    }

    /**
     * Store a new product.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function store(ProductRequest $request)
    {
        // Create product if everything is correct
        $product = Product::create($request->all());

        $stripe = new \Stripe\StripeClient('sk_test_51QJH6GG6wIBbt2iyQVg6IQJayaNghHn2TdAkBwM6IIH7oUsVwzxUJLXAZmzhce8frnKbvXY2Dp7HsLCqVIqGA5AE00PBU1G7Jp');
        // Add product to Stripe
        $timeStampedID = $product->id . "_" . $product->created_at->timestamp;
            $stripe->products->create([
                'id' => $timeStampedID,
                'name' => $product->display_name,
                'description' => $product->description,
            ]);
            $prices = $stripe->prices->create([
                'currency' => 'eur',
                'unit_amount' => ($product->discount_pricing ?? $product->pricing) * 100,
                'product' => $timeStampedID,
            ]);
            $product->update([
               'price_id' => $prices->id,
               'stripe_product_id' => $timeStampedID
            ]);
        return response()->json($product->id, 201); // Content created
    }

    /**
     * Update the information of a product.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     */
    public function update(ProductRequest $request, int $id)
    {
        // Update and return product if everything is correct
        $product_model = Product::find($id);
        if ($product_model == null) { return response()->json(null, 404); } // Not found

        // Update the product
        if ($request->pricing !== $product_model->pricing || $request->discount_pricing !== $product_model->discount_pricing) {
            $stripe = new \Stripe\StripeClient('sk_test_51QJH6GG6wIBbt2iyQVg6IQJayaNghHn2TdAkBwM6IIH7oUsVwzxUJLXAZmzhce8frnKbvXY2Dp7HsLCqVIqGA5AE00PBU1G7Jp');

            $prices = $stripe->prices->create([
                'currency' => 'eur',
                'unit_amount' => ($request->discount_pricing ?? $request->pricing) * 100,
                'product' => $product_model->stripe_product_id,

            ]);
            $product_model->update([
                'price_id' => $prices->id,
             ]);
        }

        $product_model->update($request->all());
        return response()->json(null, 202); // Request accepted
    }

    /**
     * Remove a product.
     *
     * @param int $id
     */
    public function destroy(int $id)
    {
        // Find and delete product by id
        $product_model = Product::find($id);
        if ($product_model == null) { return response()->json(null, 404); } // Not found

        // Delete the product
        $product_model->delete();
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
    $product = Product::where('id', $id)->first();
    // if user doesn't have an attachment_id create a new one
    if (!$product->attachment) {
        $product->attachment()->create();  
        $product->load('attachment');
    } 

    foreach ($request->file('images') as $image) {
        // Save the image with the attachment ID
        $path = $image->store('images/products', 'public');
        $image = new Images();
        $image->url = Storage::url($path);
        $image->attachment_id = $product->attachment->id;
        $image->save();

        $uploadedImages[] = $image; // Add to the result list
    }

    return response()->json([
        'message' => 'Images uploaded successfully.',
        'images' => $uploadedImages,
    ]);
}



    public function removeImage(Request $request, ProductImage $image){
        $oldImagePath = str_replace('/storage/', '', $image->url);
        Storage::disk('public')->delete($oldImagePath);
        $image->delete();
        return response()->json(true, 204); // No content
    }

    // Import products to Stripe system
    public function importProducts() {
        $stripe = new \Stripe\StripeClient('sk_test_51QJH6GG6wIBbt2iyQVg6IQJayaNghHn2TdAkBwM6IIH7oUsVwzxUJLXAZmzhce8frnKbvXY2Dp7HsLCqVIqGA5AE00PBU1G7Jp');

        // imports products that don't have Stripe ID
        $products = Product::where('stripe_product_id', null)->get();


        foreach ($products as $product) {
            $timeStampedID = $product->id . "_" . $product->created_at->timestamp;
            $stripe->products->create([
                'id' => $timeStampedID,
                'name' => $product->display_name,
                'description' => $product->description,
            ]);
            $prices = $stripe->prices->create([
                'currency' => 'eur',
                'unit_amount' => ($product->discount_pricing ?? $product->pricing) * 100,
                'product' => $timeStampedID,
            ]);
            $product->update([
               'price_id' => $prices->id,
               'stripe_product_id' => $timeStampedID
            ]);

        }
        return Product::all();
    }

}

