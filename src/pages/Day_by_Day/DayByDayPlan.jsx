import React from "react";
import TouristSpotCard from "./TouristSpotCard";
import TravelCard from "./TravelCard";

export default function DayByDayPlan() {
  return (
    <section className="text-gray-600 body-font overflow-hidden flex">
      <div className="px-5 py-10 mx-auto">
        <div className="-my-8 divide-y-2 flex flex-row justify-center w-full">
          {/* <div className="w-1/3">
            <div className="bg-yellow-950 flex justify-center h-full">
              <TouristSpotCard />
            </div>
          </div> */}
          <div className="w-3/6 flex flex-col items-center pt-2">
            <TouristSpotCard />
            <TravelCard />
            <TouristSpotCard />
          </div>
          {/* <div className="w-1/3">
            <div className="bg-yellow-950 flex justify-center h-full">
              <TouristSpotCard />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
