<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if ($admin && Hash::check($request->password, $admin->password)) {
            $verificationCode = rand(100000, 999999); // Generate a 6-digit code
            Log::info("Verification Code for {$admin->email}: " . $verificationCode);

            // Save the verification code to the specific user in the database
            $admin->verification_code = $verificationCode;
            $admin->save();

            // Send the verification code to the user's email
            Mail::to($admin->email)->send(new VerificationCodeMail($verificationCode));

            return response()->json([
                'message' => 'Verification code sent to your email',
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'code' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if ($admin && $admin->verification_code == $request->code) {
            $token = $admin->createToken('authToken')->plainTextToken;

            // Clear the verification code after successful verification
            $admin->verification_code = null;
            $admin->save();

            return response()->json([
                'message' => 'Code verified successfully',
                'token' => $token,
            ], 200);
        }

        return response()->json(['message' => 'Invalid verification code'], 401);
    }
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $token = bin2hex(random_bytes(30)); // Generate a random token
        $admin->password_reset_token = $token;
        $admin->password_reset_token_expires_at = now()->addHours(1); // Token expires in 1 hour
        $admin->save();

        $resetLink = url("/auth/reset-password?token={$token}");

        // Send Reset Email
        Mail::to($admin->email)->send(new \App\Mail\ResetPasswordMail($resetLink));

        return response()->json(['message' => 'Reset link sent to your email'], 200);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $admin = Admin::where('password_reset_token', $request->token)
            ->where('password_reset_token_expires_at', '>', now())
            ->first();

        if (!$admin) {
            return response()->json(['message' => 'Invalid or expired token'], 400);
        }

        $admin->password = Hash::make($request->password);
        $admin->password_reset_token = null;
        $admin->password_reset_token_expires_at = null;
        $admin->save();

        return response()->json(['message' => 'Password reset successfully'], 200);
    }
}
