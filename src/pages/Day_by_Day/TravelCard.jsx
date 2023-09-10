import { Rating } from "@mui/material";
import React from "react";
import { MdDriveEta } from "react-icons/md";
import { TbMathGreater } from "react-icons/tb";
import { FaRoad } from "react-icons/fa";
import { PiClockCounterClockwiseBold } from "react-icons/pi";

export default function TravelCard({ event }) {
  return (
    <div className=" min-w-full py-8 flex flex-row items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 bg-gray-100 ">
      <div className="flex items-center justify-center min-h-full min-w-full">
        <div className=" md:w-1/3  min-w-full">
          <div className="flex rounded-lg min-h-full  p-8 flex-col">
            <div className="flex items-center mb-3 justify-center">
              <h2 className="text-gray-900 text-2xl font-bold title-font">
                {event.previousLocation} city to {event.nextLocation} city
              </h2>
            </div>
            <div className="flex-grow">
              <div className="flex flex-row items-center">
                <div className="text-gray-700 w-2/3  p-2">
                  <h1 className="font-bold">
                    Depart from {event.previousLocation} city
                  </h1>
                </div>
              </div>
            </div>
            <div className="container flex flex-col items-start justify-center">
              <div className="container  flex flex-row items-center justify-start p-2  cursor-pointer">
                <MdDriveEta className="text-lg text-black mr-5" />
                <h2 className="text-xs mr-2 text-gray-700">Drive</h2>
              </div>
              <div className="container  flex flex-row items-center justify-start  p-2  cursor-pointer">
                <FaRoad className="text-lg text-black mr-5" />
                <h2 className="text-xs mr-2 text-gray-700">
                  Approximately {Math.ceil(event.distance)} km
                </h2>
              </div>
              <div className="container  flex flex-row items-center justify-start p-2  cursor-pointer">
                <PiClockCounterClockwiseBold className="text-lg text-black mr-5" />
                <h2 className="text-xs mr-2 text-gray-700">
                  Approximately {Math.ceil(event.time)} hrs
                </h2>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-row items-center ">
                <div className="text-gray-700 w-2/3  p-2">
                  <h1 className="font-bold">
                    Arrive in {event.nextLocation} city
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
