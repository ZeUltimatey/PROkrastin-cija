<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Show all products.
     */
    public function index(Request $request)
    {
        // Initialize a query builder for the Product model
        $query = Product::query();

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

        // Filter by keyword in display_name (if provided)
        if ($request->has('keyword')) {
            $query->where('display_name', 'LIKE', '%' . $request->keyword . '%');
        }

        // Set the default number of records per page to 10 if not provided
        $perPage = $request->get('per_page', 10);  // Default to 10 records per page

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
        Product::create($request->all());
        return response()->json(null, 201); // Content created
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


    public function addImage(Request $request, int $id){

        $validator = Validator::make($request->all(),
            [
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }
        $image = $request->file('image');
        $path = $image->store('images/products', 'public');
        $imageUrl = Storage::url($path);

        return ProductImage::create([
            'product_id' => $id,
            'url' => $imageUrl,
        ]);
    }


    public function removeImage(Request $request, ProductImage $image){
        $oldImagePath = str_replace('/storage/', '', $image->url);
        Storage::disk('public')->delete($oldImagePath);
        $image->delete();
        return response()->json(true, 204); // No content
    }
}

