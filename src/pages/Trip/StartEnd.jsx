import React from "react";
import { AiTwotoneCheckCircle } from "react-icons/ai";
export default function StartEnd({ startCity, endCity }) {
  return (
    <div className="container flex flex-row items-center justify-start mb-5 pr-3 pt-3 pb-3 ml-1 cursor-pointer">
      <AiTwotoneCheckCircle className="mr-4 text-black text-lg " />
      <h2 className="font-bold text-gray-700 text-xl">
        {startCity !== "" ? `Start: ${startCity} City` : `End: ${endCity} City`}
      </h2>
    </div>
  );
}
