<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('images', 'minio');

            return response()->json(['path' => $path], 200);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }
}