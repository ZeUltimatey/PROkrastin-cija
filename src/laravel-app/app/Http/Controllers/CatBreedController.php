<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatBreedRequest;
use App\Http\Resources\CatBreedResource;
use App\Models\Cat;
use App\Models\CatBreed;
use App\Models\Attachment;
use App\Models\Images;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class CatBreedController extends Controller
{
    /**
     * Show all cat breeds.
     */
    public function index(Request $request)
    {
        // Initialize a query builder for the CatBreed model
        $query = CatBreed::query();

        // Filter by keyword in display_name (if provided)
        if ($request->has('keyword')) {
            $query->where('display_name', 'LIKE', '%' . $request->keyword . '%');
        }

        // Set the default number of records per page to 10 if not provided
        $perPage = $request->get('per_page', 10);  // Default to 10 records per page

        // Get paginated results
        $cat_breeds = $query->paginate($perPage);

        // Append current request parameters to pagination links
        $cat_breeds->appends($request->except('page'));

        // Return paginated cat breeds as a resource collection
        return CatBreedResource::collection($cat_breeds);
    }

    /**
     * Show a single cat breed.
     *
     * @param int $id
     */
    public function show(int $id)
    {
        // Find the cat breed by id
      
        $cat_breed = CatBreedResource::collection(CatBreed::where('id', $id)->get());
        if ($cat_breed->resource == null) { return response()->json(null, 404); } // Not found

        // Return the cat breed
        return $cat_breed;
    }

    /**
     * Store a new cat breed.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function store(CatBreedRequest $request)
    {
        // Create the cat breed
        CatBreed::create($request->all());
        return response()->json(null, 201); // Content created
    }

    /**
     * Update the information of a cat breed.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     */
    public function update(CatBreedRequest $request, int $id)
    {
        // Sense
        $cat_breed_data = $request->all();

        // Update and return cat breed if everything is correct
        $cat_breed_model = CatBreed::find($id);
        if ($cat_breed_model == null) { return response()->json(null, 404); } // Not found

        // Update the cat breed
        $cat_breed_model->update($cat_breed_data);
        return response()->json(null, 200); // OK
    }

    /**
     * Remove a cat breed.
     *
     * @param int $id
     */
    public function destroy(string $id)
    {
        // Find and delete cat breed by id
        $cat_breed_model = CatBreed::find($id);
        if ($cat_breed_model == null) { return response()->json(null, 404); } // Not found

        // Delete the cat breed
        $cat_breed_model->delete();
        return response()->json(true, 204); // No content
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
    $catBreed = CatBreed::where('id', $id)->first();
    // if user doesn't have an attachment_id create a new one
    if (!$catBreed->attachment) {
        $catBreed->attachment()->create();  
        $catBreed->load('attachment');
    } 

    foreach ($request->file('images') as $image) {
        // Save the image with the attachment ID
        $path = $image->store('images/breeds', 'public');
        $image = new Images();
        $image->url = Storage::url($path);
        $image->attachment_id = $catBreed->attachment->id;
        $image->save();

        $uploadedImages[] = $image; // Add to the result list
    }

    return response()->json([
        'message' => 'Images uploaded successfully.',
        'images' => $uploadedImages,
    ]);
    }
}
