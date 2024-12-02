<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:6',
            'designation' => 'nullable|string',
            'phone_no' => 'nullable|string',
            'address' => 'nullable|string',
            'verification_code' => 'nullable|string',
        ]);

        // Create the admin
        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'designation' => $validated['designation'],
            'phone_no' => $validated['phone_no'],
            'address' => $validated['address'],
            'verification_code' => $validated['verification_code'],
        ]);

        return response()->json($admin, 201);
    }

    public function show($id)
    {
        $admin = User::findOrFail($id);
        return response()->json($admin);
    }

    public function update(Request $request, $id)
    {
        $admin = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'designation' => 'nullable|string',
            'phone_no' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $admin->update($validated);

        return response()->json($admin);
    }

    public function getUserDetails(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if ($user) {
            return response()->json([
                'user' => $user,
            ]);
        }

        return response()->json([
            'error' => 'Unauthorized',
        ], 401);
    }
}
