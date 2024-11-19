import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from "../../../img/bg-2.jpg"; // Replace with the correct path to your background image

export function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        token,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:  `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Set New Password
          </h2>
          <p className="text-sm text-gray-500">Set your password for log in.</p>
        </div>
        {message && (
          <p className="text-center text-red-500 mt-2">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Hidden Email Field */}
          <input type="hidden" value={token} onChange={() => {}} />

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
