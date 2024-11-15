<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatBreedResource;
use App\Http\Resources\ProductResource;
use App\Models\CatBreed;
use App\Models\Product;
use App\Services\PaginateService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Show products + breeds.
     */
    public function index(Request $request)
    {
        // Initialize a query builder for the Product model
        $product_query = Product::query()
            ->select('products.*')
            ->leftJoin('cats', 'products.id', '=', 'cats.id')
            ->leftJoin('cat_breeds', 'cats.breed_id', '=', 'cat_breeds.id');

        // Filter by keyword in display_name or description (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $product_query->where(function ($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(products.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(products.description, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(cat_breeds.display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        $breed_query = CatBreed::query();
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $breed_query->where(function($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        $product_resources = ProductResource::collection($product_query->get());
        $breed_resources = CatBreedResource::collection($breed_query->get());
        $paginate = new PaginateService($request, [$breed_resources, $product_resources]);

        $per_page = $request->get('per_page', 12);
        $page = $request->get('page', 1);

        // Return paginated products as a resource collection
        return $paginate->get_page($page, $per_page);
    }
}
