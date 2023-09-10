import React from "react";
import { MdExpandMore } from "react-icons/md";
import {
  PiNumberCircleZeroFill,
  PiNumberCircleNineFill,
  PiNumberCircleEightFill,
  PiNumberCircleSevenFill,
  PiNumberCircleSixFill,
  PiNumberCircleFiveFill,
  PiNumberCircleFourFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
  PiNumberCircleOneFill,
} from "react-icons/pi";

export default function Tour({ citySerial, travel }) {
  const icons = [
    PiNumberCircleZeroFill,
    PiNumberCircleOneFill,
    PiNumberCircleTwoFill,
    PiNumberCircleThreeFill,
    PiNumberCircleFourFill,
    PiNumberCircleFiveFill,
    PiNumberCircleSixFill,
    PiNumberCircleSevenFill,
    PiNumberCircleEightFill,
    PiNumberCircleNineFill,
  ];
  const Icon = icons[citySerial];
  return (
    <div className="container flex flex-row items-center justify-start mb-5 pr-3 pt-3 pb-3 cursor-pointer ">
      <Icon className="mr-3 text-black text-3xl" />
      <h2 className="font-bold text-gray-700 text-xl mr-2">
        {travel.city} - {travel.days} nights
      </h2>
    </div>
  );
}
