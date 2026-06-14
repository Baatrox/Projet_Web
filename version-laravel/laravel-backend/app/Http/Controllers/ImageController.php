<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();
        $result = $images->map(function ($img) {
            // Map file extension to MIME type
            $mimeTypes = [
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
            ];
            $mimeType = $mimeTypes[strtolower($img->type)] ?? 'application/octet-stream';
            
            return [
                'id' => $img->id,
                'name' => $img->name,
                'type' => $img->type,
                'mimeType' => $mimeType,
                'size' => $img->size,
                'dataUrl' => 'data:' . $mimeType . ';base64,' . base64_encode($img->bin_img),
            ];
        });
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,gif,webp|max:10240',
        ]);

        $file = $request->file('image');
        $name = $request->input('name', $file->getClientOriginalName());

        $image = Image::create([
            'name' => $name,
            'type' => $file->getClientOriginalExtension(),
            'size' => $file->getSize(),
            'bin_img' => file_get_contents($file->getRealPath()),
        ]);

        return response()->json(['success' => true, 'id' => $image->id]);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
        return response()->json(['success' => true]);
    }
}
