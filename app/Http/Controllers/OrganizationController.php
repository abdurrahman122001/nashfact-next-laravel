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
            'contact_phone' => 'required|string|max:20',
            'monthly_plan' => 'required|in:Pending,Active,Expired',
        ]);

        // Create a new organization using the validated data
        $organization = Organization::create($validatedData);

        // Return a success message with a 201 status code
        return response()->json([
            'message' => 'Organization added successfully',
            'organization' => $organization
        ], 201);
    }
   // In OrganizationController.php
public function count()
{
    // Example logic to return the count of organizations
    $organizationCount = Organization::count(); // Assuming you have an Organization model
    return response()->json(['count' => $organizationCount]);
}

}

