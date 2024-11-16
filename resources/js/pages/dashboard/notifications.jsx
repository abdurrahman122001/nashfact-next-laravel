import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaPlus, FaArrowUp } from "react-icons/fa";
import Profile from "../../../img/profile.png";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PiArrowCircleUpLight } from "react-icons/pi";

const ToggleSwitch = ({ isEnabled, onToggle }) => (
  <label
    className="relative inline-flex items-center cursor-pointer"
    aria-label="Toggle switch"
  >
    <input
      type="checkbox"
      className="sr-only"
      checked={isEnabled}
      onChange={onToggle}
    />
    <div
      className={`w-10 h-6 bg-gray-200 rounded-full relative transition-colors ${isEnabled ? "bg-orange-500" : ""
        }`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? "transform translate-x-4" : ""
          }`}
      ></span>
    </div>
  </label>
);

export function Notifications() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admins/2")
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching the data:", error)
      );
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md text-gray-800 mt-10">
      {/* Update Notification Section */}
      <div className="flex mt-4 p-4 mb-6 rounded-md">
        <div className="flex items-center w-[70%]">
          {/* Profile Image */}
          <img
            src={Profile}
            alt="Profile"
            className="w-15 h-15 rounded-full mr-4" // Added margin to separate the image and text
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />

          {/* Profile Text */}
          <div>
            <h2 className="text-lg font-semibold">{admin.name || "Admin"}</h2>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        <div className="w-[30%] p-3 mt-4 bg-white shadow-lg flex justify-between px-4">
          <div className="space-y-2 p-5 rounded-lg">
            <p style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-black font-semibold">Update Available!</p>
            <p style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-sm text-black-200 rounded-sm">Update to the latest version.</p>
          </div>
          <button className="text-orange-500 text-2xl">
            <PiArrowCircleUpLight />
          </button>
        </div>
      </div>
      {/* Update button */}
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Account Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Account</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Name</span>
              <span className="flex items-center text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>
                {admin.name || "Eden Markram"}
                <button className="ml-2 text-orange-500">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Email</span>
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>{admin.email || "example@mail.com"}</span>
            </div>
          </div>

          {/* Language Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Language</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Current language of App</span>
              <span className="flex items-center text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>
                English
                <button className="ml-2 text-orange-500">
                  <FaPlus />
                </button>
              </span>
            </div>
          </div>

          {/* Privacy Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: 'Poppins' }}>Privacy</h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Password protected</span>
              <button className="text-orange-500 text-sm" style={{ fontFamily: 'Poppins' }}>Change</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Two Factor Authentication</span>
              <ToggleSwitch
                isEnabled={isTwoFactorAuthEnabled}
                onToggle={() =>
                  setIsTwoFactorAuthEnabled(!isTwoFactorAuthEnabled)
                }
              />
            </div>
          </div>

          {/* Remove Account Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-sm font-semibold text-gray-600 mb-2">
              Remove account?
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ fontFamily: 'Poppins' }}>
                Do you want to remove your account permanently?
              </span>
              <button style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="bg-orange-500 text-white px-4 py-1 rounded">
                Remove
              </button>
            </div>
          </div>

          {/* App Version Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-sm font-semibold text-gray-600 mb-2">
              App version
            </h3>
            <span style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-sm">Version 2.0.13</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6" style={{ marginTop: '50px' }}>
          {/* Theme Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Theme</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Customize the App theme</span>
              <ToggleSwitch
                isEnabled={isDarkTheme}
                onToggle={() => setIsDarkTheme(!isDarkTheme)}
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Notifications
            </h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Enable notifications</span>
              <ToggleSwitch
                isEnabled={isNotificationsEnabled}
                onToggle={() =>
                  setIsNotificationsEnabled(!isNotificationsEnabled)
                }
              />
            </div>
            <button style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-orange-500 text-sm">
              Notifications Setting
            </button>
          </div>

          {/* Support Section */}
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-sm font-semibold text-gray-600 mb-2">
              Support and feedback
            </h3>
            <div className="space-x-4">
              <button style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-orange-500 text-sm">Contact support</button>
              <button style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-orange-500 text-sm">Report an issue</button>
              <button style={{ fontFamily: 'Poppins', fontSize: '16px' }} className="text-orange-500 text-sm">Submit feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
