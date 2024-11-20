<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use Illuminate\Http\JsonResponse;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::all();
        return response()->json($organizations);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'date_signed_up' => 'required|date',
            'company_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'password' => 'required|string|min:8', // New validation rule
            'contact_phone' => 'required|string|max:20',
            'monthly_plan' => 'required|in:Pending,Active,Expired',
            'manager_name' => 'nullable|string|max:255',
            'manager_phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'address' => 'nullable|string|max:255',
            'address2' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
        ]);

        // Hash the password before saving
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Create a new organization using the validated data
        $organization = Organization::create($validatedData);

        // Return a success message with a 201 status code
        return response()->json([
            'message' => 'Organization added successfully',
            'organization' => $organization,
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $organization = Organization::find($id);

        if (!$organization) {
            return response()->json(['message' => 'Organization not found'], 404);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'date_signed_up' => 'nullable|date',
            'company_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:20',
            'monthly_plan' => 'required|in:Pending,Active,Expired',
            'manager_name' => 'nullable|string|max:255',
            'manager_phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'address' => 'nullable|string|max:255',
            'address2' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
        ]);

        // Update the organization with validated data
        $organization->update($validatedData);

        return response()->json([
            'message' => 'Organization updated successfully',
            'organization' => $organization,
        ]);
    }

    public function count()
    {
        // Example logic to return the count of organizations
        $organizationCount = Organization::count();
        return response()->json(['count' => $organizationCount]);
    }
}
