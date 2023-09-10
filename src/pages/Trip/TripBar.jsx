import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { setPlan } from "../../redux/features/plan-slice";
import { Store } from "react-notifications-component";

export default function TripBar() {
  // const username = useSelector((state) => state.persistedUserReducer.username);
  const location = useLocation();

  //dispatch to do redux stuffs
  const dispatch = useDispatch();

  //notifications stuff
  const notification = {
    title: "Success",
    message: "Plan Saved Successfully",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
  };

  // const userIsLoggedIn = username !== "";
  // get the end path from this pathname , path from the last /
  const endPath = location.pathname.split("/").pop();
  // console.log("current path ends with : ", endPath);
  const [user, loading, error] = useAuthState(auth);
  const [saveButtonVal, setSaveButtonVal] = useState("Save");
  // console.log('user :',user.email);

  const currentPlan = useSelector(
    (state) => state.persistedPlanReducer.value.plan
  );

  const savePlan = (e) => {
    e.preventDefault();
    document.getElementById("save").disabled = true;

    setSaveButtonVal("Saving");
    async function savePlan() {
      try {
        console.log("sending plan save  request ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/save`,
          {
            method: "POST",
            body: JSON.stringify({ plan: currentPlan, email: user.email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const status = response.status;
        const jsonData = response.data;
        if (status === 200) {
          // show the success notification
          Store.addNotification({
            ...notification,
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
          dispatch(setPlan(jsonData));
        } else {
          // show the failure notification
          Store.addNotification({
            ...notification,
            title: `Failure`,
            message: "There was a problem while saving the plan",
            type: "danger",
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
        // setSaveButtonVal("Plan Saved");
      }
    }
    savePlan();
  };

  return (
    <header className="text-gray-600 shadow-lg relative">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            to={user ? "/" + user.email + "/trip" : "/random/trip"}
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath == "trip" ? "border-gray-900" : "border-transparent"
            }`}
          >
            Route
          </NavLink>

          <NavLink
            to={
              user
                ? "/" + user.email + "/trip/day_by_day"
                : "/random/trip/day_by_day"
            }
            className={`mr-5 hover:text-gray-900 relative hover:bg-slate-200 p-3 border-b-2 ${
              endPath == "day_by_day" ? "border-gray-900" : "border-transparent"
            }`}
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
          >
            Checklist
          </NavLink> */}
        </nav>
        {user && (
          <button
            onClick={savePlan}
            id="save"
            className={`flex mx-auto text-black border-gray-800 border-2 py-1 px-2 focus:outline-none hover:bg-gray-100  rounded-md text-sm absolute right-20 ${
              saveButtonVal === "Saving" ? "bg-gray-100" : "bg-transparent"
            }`}
          >
            {saveButtonVal}
          </button>
        )}
      </div>
    </header>
  );
}
