import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdDriveEta } from "react-icons/md";
import TouristSpotCard from "../Day_by_Day/TouristSpotCard";
import RestuarantCard from "../Day_by_Day/RestuarantCard";
import TravelCard from "../Day_by_Day/TravelCard";

export default function TourBuddyDayByDayPlan({ plann }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="text-gray-600 body-font overflow-hidden flex">
      <div className="px-5 py-10 mx-auto">
        <div className="-my-8 divide-y-2 flex flex-row justify-start items-start min-w-full ">
          {/* here new component will be added */}
          <div className="w-3/6 flex flex-col items-center pt-2 ml-20 ">
            {plann.daybyday.map((daybydayplan, index) => {
           
              const presentId = "target-component " + index;
              const date = new Date(daybydayplan.date);
              const month = monthNames[date.getMonth()];
              const presentDay = date.getDate();
              return (
                <div key={index}>
                  <div id={presentId} className="pb-4 pt-4"></div>
                  <div className="flex flex-row justify-start h-12 w-2/3 items-center">
                    <h1 className="text-2xl font-semibold w-1/3 min-h-full  pl-2 pt-2">
                      {month + " " + presentDay}
                    </h1>
                  </div>
                  {daybydayplan.cluster.map((event, index) => {
                    if (event.id >= 0)
                      return (
                        <div
                          className={`${
                            event.checklist === "true"
                              ? `opacity-30`
                              : `opacity-100`
                          }`}
                        >
                          {index > 0 && (
                            <div className="container  flex flex-row items-center justify-start p-2  cursor-pointer">
                              <MdDriveEta className="text-lg text-black mr-5" />
                              <h2 className="text-xs mr-2 text-gray-700">
                                Drive
                              </h2>
                            </div>
                          )}
                          <TouristSpotCard key={index} event={event} />
                        </div>
                      );
                    else return <RestuarantCard key={index} event={event} />;
                  })}
                  {daybydayplan.travel && (
                    <TravelCard event={daybydayplan.travel} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
