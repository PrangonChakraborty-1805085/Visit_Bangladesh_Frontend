import React from "react";
import TripBar from "../Trip/TripBar";
import DayByDayPlan from "./DayByDayPlan";
import Header_other from "../../components/Headers/Header_other";

export default function Day_by_Day() {
  return (
    <div className=" flex flex-col min-h-screen">
      <Header_other />
      <div className="mt-20">
        <TripBar />
      </div>
      <DayByDayPlan/>
    </div>
  );
}
