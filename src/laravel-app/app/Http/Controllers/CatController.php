<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatRequest;
use App\Http\Resources\ProductResource;
use App\Models\Cat;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class CatController extends Controller
{
    /**
     * Show all cats.
     */
    public function index(Request $request)
    {
        // Initialize a query builder for the Product model
//        $query = Product::query();
        $query = Product::query()
            ->select('products.*')
            ->leftJoin('cats', 'products.id', '=', 'cats.id')
            ->leftJoin('cat_breeds', 'cats.breed_id', '=', 'cat_breeds.id')
            ->where('products.product_type', 'CATS'); // Filter for CATS product type
//        $query->whereIn('product_type', ['CATS']);

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

// Filter by keyword in display_name, description, or cats_breeds.display_name (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $query->where(function ($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(products.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(products.description, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(cat_breeds.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        // Sort by price if 'price_sort' parameter is provided
        if ($request->has('price_sort') && in_array(strtolower($request->price_sort), ['asc', 'desc'])) {
            $sortOrder = strtolower($request->price_sort) === 'asc' ? 'asc' : 'desc';

            // Sorting by discounted price first if it exists, else regular price using CASE WHEN
            $query->orderByRaw("(CASE WHEN discount_pricing IS NOT NULL THEN discount_pricing ELSE pricing END) " . $sortOrder);
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
     * Store a new cat.
     */
    public function store(CatRequest $request)
    {
        // Sense
        $cat_data = $request->all();

        // Create the Product
        $product_model = Product::create([
            'product_type'     => 'CATS',
            'display_name'     => $cat_data['display_name'],
            'description'      => $cat_data['description'],
            'pricing'          => $cat_data['pricing'],
            'discount_pricing' => $cat_data['discount_pricing'],
            'stock'            => $cat_data['stock'],
        ]);

        // Create the Cat model
        Cat::create([
            'id'        => $product_model->id,
            'breed_id'  => $cat_data['breed_id'],
            'birthdate' => $cat_data['birthdate'],
            'color'     => $cat_data['color'],
        ]);

        return response()->json(null, 201); // Content created
    }

    /**
     * Update the information of a cat.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     *
     */
    public function update(CatRequest $request, int $id)
    {
        // Sense
        $cat_data = $request->all();

        // Find the cat by ID
        $product = ProductResource::find($id);
        if ($product->resource == null) { return response()->json(null, 404); } // Not found
        if ($product->cat == null) { return response()->json(['error' => 'Product does not have a cat counterpart'], 404); } // Not found

        // Get current cat model
        $cat_model = Cat::find($id);

        // Update the product part
        $product->update([
            'display_name'     => $cat_data['display_name'],
            'description'      => $cat_data['description'],
            'pricing'          => $cat_data['pricing'],
            'discount_pricing' => $cat_data['discount_pricing'],
            'stock'            => $cat_data['stock'],
        ]);

        // Update the cat part
        $cat_model->update([
            'breed_id'  => $cat_data['breed_id'],
            'birthdate' => $cat_data['birthdate'],
            'color'     => $cat_data['color'],
        ]);

        return response()->json(null, 200); // OK
    }
}
