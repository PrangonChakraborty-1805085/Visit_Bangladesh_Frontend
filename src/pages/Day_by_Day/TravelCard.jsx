import { Rating } from "@mui/material";
import React from "react";

export default function TravelCard({ event }) {
  const eventt = {
    type: "depart",
    start: "Sylhet",
    end: "Dhaka",
    startTime: "6 am",
    endTime: "1 pm",
  };
  return (
    <div className=" min-w-full py-8 flex flex-row items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 ">
      <div className="flex items-center justify-center min-h-full min-w-full">
        <div className=" md:w-1/3  min-w-full">
          <div className="flex rounded-lg min-h-full  p-8 flex-col">
            <div className="flex items-center mb-3">
              <h2 className="text-gray-900 text-lg font-bold title-font">
                {event.start} city to {event.end} city
              </h2>
            </div>
            <div className="flex-grow">
              <div className="flex flex-row items-center">
                <div className="text-gray-600  w-1/3 flex flex-col items-start p-2">
                  <h1>{event.startTime}</h1>
                </div>
                <div className="text-gray-700 w-2/3  p-2">
                  <h1 className="font-bold">Depart from {event.start} city</h1>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-row items-center ">
                <div className="text-gray-600  w-1/3 flex flex-col items-start p-2">
                  <h1>{event.endTime}</h1>
                </div>
                <div className="text-gray-700 w-2/3  p-2">
                  <h1 className="font-bold">Arrive in {event.end} city</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
