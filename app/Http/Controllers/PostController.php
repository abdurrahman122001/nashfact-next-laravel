<?php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Thumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function create(Request $request)
    {
        try {
            // Validate incoming request
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'categories' => 'nullable|json',
                'thumbnail' => 'nullable|file|mimes:jpg,jpeg,png',
            ]);

            // Log incoming request for debugging
            Log::info('Request Data:', $request->all());

            // Create a new post
            $post = new Post();
            $post->title = $request->input('title');
            $post->content = $request->input('content');
            $post->user_id = Auth::id(); // Ensure user is authenticated
            $post->save();

            // Attach categories
            if ($request->has('categories')) {
                $categories = json_decode($request->input('categories'), true);
                if (is_array($categories)) {
                    $post->categories()->sync($categories);
                }
            }

            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('thumbnails');
                $thumbnail = new Thumbnail(['file_path' => $path]);
                $post->thumbnail()->save($thumbnail);
            }

            return response()->json([
                'message' => 'Post created successfully!',
                'post' => $post,
            ], 201);

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error creating post:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'An error occurred while creating the post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
