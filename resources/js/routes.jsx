import React from "react";
import {
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import MessagesCard from "./pages/dashboard/MessagesCard";
import { SignIn, SignUp } from "@/pages/auth";
import { CiGrid42 } from "react-icons/ci";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
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
        path: "/MessagesCard",
        element: <MessagesCard />,
        hidden: true, // Marked as hidden
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <CiLogout {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      }
     
    ],
  },
];

// Filter out hidden routes dynamically for navigation purposes
const visibleRoutes = routes.map((route) => ({
  ...route,
  pages: route.pages.filter((page) => !page.hidden),
}));

export default visibleRoutes;
