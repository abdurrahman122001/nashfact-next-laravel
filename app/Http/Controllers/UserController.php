<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get paginated users.
     */
    public function index(Request $request)
    {
        // Get pagination limit (default to 10)
        $limit = $request->get('limit', 10);

        // Paginate users
        $users = User::paginate($limit);

        return response()->json([
            'users' => $users->items(),
            'total' => $users->total(),
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
        ]);
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email']));
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
    public function count()
    {
        $totalUsers = User::count();
        return response()->json(['totalUsers' => $totalUsers]);
    }

}
