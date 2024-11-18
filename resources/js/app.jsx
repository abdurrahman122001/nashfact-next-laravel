import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Protect Dashboard routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Public Auth routes */}
        <Route path="/auth/*" element={<Auth />} />

        {/* Redirect any unknown routes to dashboard home */}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
