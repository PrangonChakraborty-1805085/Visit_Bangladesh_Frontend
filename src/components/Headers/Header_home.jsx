import React from "react";
import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import

export default function Header_home() {
//   const location = useLocation();
//   const isHomeRoute = location.pathname === "/";
  // const isHomeRoute = true;

  return (
    <header className={`text-gray-800 bg-transparent fixed w-full top-0 z-10`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          to="/"
          className={`flex title-font font-medium items-center mb-4 md:mb-0 text-white`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-10 h-10 p-2 rounded-full text-indigo-500 bg-white`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className={`ml-3 text-xl text-white`}>Visit Bangladesh</span>
        </NavLink>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"></nav>
        <NavLink to="/login">
          <button
            className={`inline-flex text-white items-center bg-transparent border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 mr-4 md:mt-0`}
          >
            Login
          </button>
        </NavLink>
        <NavLink to="/signup">
          <button
            className={`inline-flex text-white items-center border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 md:mt-0 border-white`}
          >
            Sign Up
          </button>
        </NavLink>
      </div>
    </header>
  );
}
