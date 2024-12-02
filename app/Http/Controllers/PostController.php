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
                'status' => $validatedData['status'],
            ]);

            // Handle thumbnail upload
            // if ($request->hasFile('thumbnail')) {
            //     $thumbnailPath = $request->file('thumbnail')->store('thumbnails');
            //     Thumbnail::create([
            //         'post_id' => $post->id,
            //         'file_path' => $thumbnailPath,
            //     ]);
            // }
            if ($request->hasFile('thumbnail')) {
                // Store the thumbnail in a directory called 'public/thumbnails'
                $thumbnailPath = $request->file('thumbnail')->store('public/thumbnails');

                // Save the thumbnail path in the database
                Thumbnail::create([
                    'post_id' => $post->id,
                    'file_path' => str_replace('public/', '', $thumbnailPath), // Remove 'public/' prefix for storage path consistency
                ]);
            }

            return response()->json([
                'message' => 'Post created successfully!',
                'post' => $post->load('thumbnail'),
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
    public function getPosts(Request $request)
    {
        try {
            $limit = $request->input('limit', 10); // Default 10 posts per page
            $page = $request->input('page', 1); // Default to the first page

            // Paginate posts
            $posts = Post::select(['id', 'title', 'content', 'categories', 'created_at', 'status'])
                ->skip(($page - 1) * $limit)
                ->take($limit)
                ->get();

            // Format posts
            $formattedPosts = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'categories' => $post->categories,
                    'invoiceDate' => $post->created_at->format('M d, Y'),
                    'status' => $post->status,
                ];
            });

            $totalPosts = Post::count(); // Total number of posts

            return response()->json([
                'posts' => $formattedPosts,
                'total' => $totalPosts,
                'page' => $page,
                'limit' => $limit,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'categories' => 'nullable|array', // Expect an array
                'status' => 'required|string|in:draft,published',
                'created_at' => 'nullable|date',
            ]);

            $post = Post::findOrFail($id);

            $post->title = $validatedData['title'];
            $post->content = $validatedData['content'];

            $currentCategories = $post->categories ?? [];
            $newCategories = $validatedData['categories'] ?? [];

            $categoriesToRemove = array_diff($currentCategories, $newCategories);
            $categoriesToAdd = array_diff($newCategories, $currentCategories);

            // Update categories
            $post->categories = $newCategories;

            $post->status = $validatedData['status'];
            $post->created_at = $validatedData['created_at'] ?? $post->created_at;

            $post->save();

            return response()->json(['message' => 'Post updated successfully!', 'post' => $post], 200);
        } catch (\Exception $e) {
            Log::error('Error updating post:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['message' => 'Failed to update post.', 'error' => $e->getMessage()], 500);
        }
    }
    public function getPostStats()
    {
        try {
            // Count the total number of posts
            $totalPosts = Post::count();

            return response()->json([
                'totalPosts' => $totalPosts,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve stats.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
