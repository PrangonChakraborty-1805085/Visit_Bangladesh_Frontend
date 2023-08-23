import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TripBar() {
  const username = useSelector((state) => state.persistedUserReducer.username);
  const location = useLocation();

  const userIsLoggedIn = username !== "";
  // get the end path from this pathname , path from the last /
  const endPath = location.pathname.split("/").pop();
  console.log("current path ends with : ", endPath);

  return (
    <header className="text-gray-600 shadow-lg">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            to={userIsLoggedIn ? "/" + username + "/trip" : "/random/trip"}
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath == "trip" ? "border-gray-950" : "border-transparent"
            }`}
            activeClassName="border-b-2 border-black"
          >
            Route
          </NavLink>
          <NavLink
            to={
              userIsLoggedIn
                ? "/" + username + "/trip/where_to_stay"
                : "/random/trip/where_to_stay"
            }
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath == "where_to_stay"
                ? "border-gray-950"
                : "border-transparent"
            }`}
            activeClassName="border-b-2 border-black" // Apply border-black when active
          >
            Where To Stay
          </NavLink>
          <NavLink
            to={
              userIsLoggedIn
                ? "/" + username + "/trip/day_by_day"
                : "/random/trip/day_by_day"
            }
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath == "day_by_day" ? "border-gray-950" : "border-transparent"
            }`}
            activeClassName="border-b-2 border-black" // Apply border-black when active
          >
            Day By Day
          </NavLink>
          {/* <NavLink
            to={
              userIsLoggedIn
                ? "/" + username + "/trip/checklist"
                : "/random/trip/checklist"
            }
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath === "checklist" ? "border-gray-950" : "border-transparent"
            }`}
            activeClassName="border-b-2 border-black" // Apply border-black when active
          >
            Checklist
          </NavLink> */}
        </nav>
      </div>
    </header>
  );
}
