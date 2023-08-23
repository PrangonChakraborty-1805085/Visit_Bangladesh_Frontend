import React from "react";
import TouristSpotCard from "./TouristSpotCard";
import TravelCard from "./TravelCard";
import RestuarantCard from "./RestuarantCard";
import HotelCard from "./HotelCard";
import { plan } from "../../Data";

export default function DayByDayPlan({ plann }) {
  return (
    <section className="text-gray-600 body-font overflow-hidden flex">
      <div className="px-5 py-10 mx-auto">
        <div className="-my-8 divide-y-2 flex flex-row justify-center min-w-full">
          {/* <div className="w-1/3">
            <div className="bg-yellow-950 flex justify-center h-full">
              <TouristSpotCard />
            </div>
          </div> */}
          <div className="w-3/6 flex flex-col items-center pt-2 ">
            {plann.map((daybydayplan, index) => (
              <div key={index}>
                <h1 className="text-2xl font-semibold mb-4 min-w-full">
                  {daybydayplan.date}
                </h1>
                {daybydayplan.plan.map((event, index) => {
                  if (event.type === "depart")
                    return <TravelCard key={index} event={event} />;
                  else if (event.type === "restuarant")
                    return <RestuarantCard key={index} event={event} />;
                  else if (event.type === "hotel")
                    return <HotelCard key={index} event={event} />;
                  else if (event.type === "cluster") {
                    return event.value.map((ev, index) => {
                      return <TouristSpotCard key={index} event={ev} />;
                    });
                  }
                })}
              </div>
            ))}
            {/* <TravelCard />
            <TouristSpotCard />
            <RestuarantCard />
            <HotelCard /> */}
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
