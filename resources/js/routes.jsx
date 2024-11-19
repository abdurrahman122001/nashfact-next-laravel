import React from "react";
import { Home, Profile, Tables, Notifications, MessagesCard } from "@/pages/dashboard";
import { SignIn, ForgotPassword, ResetPassword } from "@/pages/auth";
import { CiGrid42 } from "react-icons/ci";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  logout();
  localStorage.removeItem("token");
  navigate("/sign-in");
};

const routes = [
  {
    layout: "dashboard",
    title: "Dashboard",
    pages: [
      {
        icon: <CiGrid42 {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Add Organization",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <FaRegUserCircle {...icon} />,
        name: "Profile",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <IoMdSettings {...icon} />,
        name: "Settings",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <IoMdSettings {...icon} />,
        name: "Message Card",
        path: "/messagesCard",
        element: <MessagesCard />,
      },
    ],
  },
  {
    layout: "auth",
    title: "",
    pages: [
      {
        icon: <CiLogout {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <IoMdSettings {...icon} />,
        name: "Forgot Password",
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        icon: <IoMdSettings {...icon} />,
        name: "Reset Password",
        path: "/resetPassword",
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
