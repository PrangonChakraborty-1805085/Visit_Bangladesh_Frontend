import React, { useEffect, useState } from "react";
import TripBar from "../Trip/TripBar";
import DayByDayPlan from "./DayByDayPlan";
import Header_other from "../../components/Headers/Header_other";
import { useSelector } from "react-redux";

export default function Day_by_Day() {
  const [isTripBarFixed, setIsTripBarFixed] = useState(false);
  const currentPlan = useSelector(
    (state) => state.persistedPlanReducer.value.plan
  );

  const handleScroll = () => {
    // Calculate the position of the end of the TripBar component
    const tripBarHeight = document.getElementById("trip-bar").offsetHeight;
    const tripBarBottomPosition = tripBarHeight + 20; // Adjust as needed

    // Check if the user has scrolled past the end of the TripBar
    if (window.scrollY > tripBarBottomPosition) {
      setIsTripBarFixed(true);
    } else {
      setIsTripBarFixed(false);
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className=" flex flex-col min-h-screen">
      <div className="min-w-full flex flex-col">
        <Header_other />
        <div
          className={`${
            isTripBarFixed
              ? "fixed top-0 w-full z-50 transition ease-in-out bg-white"
              : ""
          }`}
          id="trip-bar"
        >
          <TripBar />
        </div>
      </div>
      <DayByDayPlan plann={currentPlan} />
    </div>
  );
}
