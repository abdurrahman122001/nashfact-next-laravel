import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import img2 from '../../../img/logo.png';
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import React from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  // Define valid background color classes for sidenavType
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // Valid button colors based on sidenavType
  const buttonColors = {
    dark: "white", // For dark sidenav, use white button color
    white: "blue-gray", // For white sidenav, use blue-gray button color
    transparent: "blue-gray", // For transparent sidenav, use blue-gray button color
  };

  // Use all routes (no filtering)
  const allRoutes = routes;

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative" style={{alignItems: 'center'}}>
        <Link to="/" className="py-6 px-8 text-center">
          <img
            src={img2}
            alt="Brand Logo"
            className="h-12 w-full ml-3"
            style={{height: '50px', width: '90%'}}
          />
        </Link>

        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {allRoutes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "filled" : "text"}
                      color={isActive ? sidenavColor : buttonColors[sidenavType]}
                      className={`flex items-center gap-4 px-4 capitalize ${isActive ? "bg-[#fff2d4]" : ""}`}
                      fullWidth
                    >
                      <span
                        className={`${isActive ? "text-black" : "text-black"} h-6 w-6`} // Set the icon color to black and increase size
                      >
                        {React.cloneElement(icon, { className: "h-6 w-6 text-black" })}
                      </span>
                      <Typography
                        color={isActive ? "black" : "inherit"}
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo.png",
  brandName: "Employee Management",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
