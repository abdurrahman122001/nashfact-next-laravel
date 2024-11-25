<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Thumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function create(Request $request)
    {
        try {
            // Validate the incoming request
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'categories' => 'nullable|json',
                'thumbnail' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
                'status' => 'required|string|in:draft,published',
            ]);

            Log::info('Request Data:', $request->all());

            // Create a new post
            $post = Post::create([
                'user_id' => Auth::id(),
                'title' => $validatedData['title'],
                'content' => $validatedData['content'],
                'categories' => json_decode($validatedData['categories'], true),
                'status' => $validatedData['status'], // Save status
            ]);

            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $thumbnailPath = $request->file('thumbnail')->store('thumbnails');
                Thumbnail::create([
                    'post_id' => $post->id,
                    'file_path' => $thumbnailPath,
                ]);
            }

            return response()->json([
                'message' => 'Post created successfully!',
                'post' => $post->load('thumbnail'), // Include the thumbnail in the response
            ], 201);
        } catch (\Exception $e) {
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
    public function getPosts()
    {
        try {
            // Fetch posts from the database
            $posts = Post::select(['title', 'created_at', 'status'])->get();

            // Format posts
            $formattedPosts = $posts->map(function ($post) {
                return [
                    'title' => $post->title,
                    'invoiceDate' => $post->created_at instanceof \DateTime ? $post->created_at->format('M d, Y') : (new \DateTime($post->created_at))->format('M d, Y'),
                    'status' => $post->status,
                ];
            });

            return response()->json($formattedPosts, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    
    }
}
