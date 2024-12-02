<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    /**
     * Get total post count.
     *
     * @return JsonResponse
     */
    public function getPostStats()
    {
        try {
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
    public function getCategoryStats()
    {
        try {
            $totalCategories = Category::count();

            return response()->json([
                'totalCategories' => $totalCategories,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve category stats.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}