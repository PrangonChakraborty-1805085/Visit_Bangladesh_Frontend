import React from "react";
import { MdDriveEta } from "react-icons/md";
import { TbMathGreater } from "react-icons/tb";
import { FaRoad } from "react-icons/fa";
import { PiClockCounterClockwiseBold } from "react-icons/pi";

export default function Transport({ travel }) {
  return (
    <div className="container flex flex-col items-start justify-center">
      <div className="container  flex flex-row items-center justify-start p-2  cursor-pointer">
        <MdDriveEta className="text-lg text-black mr-5" />
        <h2 className="text-xs mr-2 text-gray-700">Drive</h2>
      </div>
      <div className="container  flex flex-row items-center justify-start  p-2  cursor-pointer">
        <FaRoad className="text-lg text-black mr-5" />
        <h2 className="text-xs mr-2 text-gray-700">
          Approximately {travel.distance} km
        </h2>
      </div>
      <div className="container  flex flex-row items-center justify-start p-2  cursor-pointer">
        <PiClockCounterClockwiseBold className="text-lg text-black mr-5" />
        <h2 className="text-xs mr-2 text-gray-700">
          Approximately {travel.time} hrs
        </h2>
      </div>
    </div>
  );
}
