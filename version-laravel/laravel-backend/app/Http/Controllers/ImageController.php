<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    private function normalizeImageName(?string $input, string $fallback = 'image'): string
    {
        $raw = pathinfo($input ?: $fallback, PATHINFO_FILENAME);
        $raw = preg_replace('/[^a-zA-Z0-9_-]/', '_', $raw);
        $raw = preg_replace('/_+/', '_', $raw);
        $raw = trim($raw, '_');

        return substr($raw ?: $fallback, 0, 20);
    }

    public function index()
    {
        $images = Image::all();
        $result = $images->map(function ($img) {
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
        $name = $this->normalizeImageName(
            $request->input('name', $file->getClientOriginalName())
        );

        // For profile photos, delete existing one first to avoid duplicates
        if (str_starts_with($name, 'profile_')) {
            Image::where('name', $name)->delete();
        }

        $image = Image::create([
            'name' => $name,
            'type' => $file->getClientOriginalExtension(),
            'size' => $file->getSize(),
            'bin_img' => file_get_contents($file->getRealPath()),
        ]);

        return response()->json(['success' => true, 'id' => $image->id, 'name' => $name]);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
        return response()->json(['success' => true]);
    }
}
