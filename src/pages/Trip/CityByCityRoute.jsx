import React from "react";
import StartEnd from "./StartEnd";
import Transport from "./Transport";
import Tour from "./Tour";

export default function CityByCityRoute({ startCity, endCity }) {
  const cities = ["Dhaka", "Sylhet", "Chattagram"];
  const travels = [
    {
      type: "Start",
      city: startCity,
      time: "9:00 AM",
    },
    {
      type: "Transport",
      mode: "Drive",
      fromCity: startCity,
      toCity: "Sylhet",
      duration: "3", // in hours
    },
    {
      type: "Tour",
      city: "Sylhet",
      numberOfDays: 1,
      numberOfNights: 1,
    },
    {
      type: "Transport",
      mode: "Drive",
      fromCity: "Sylhet",
      toCity: "Chattagram",
      duration: "8", // in hours
    },
    {
      type: "Tour",
      city: "Chattagram",
      numberOfDays: 1,
      numberOfNights: 1,
    },
    {
      type: "Transport",
      mode: "Drive",
      fromCity: "Chattagram",
      toCity: endCity,
      duration: "5", // in hours
    },
    {
      type: "End",
      city: endCity,
      time: "9:00 PM",
    },
  ];
  return (
    <div className="flex flex-col  items-start justify-start">
      {travels.map((travel, index) => {
        if (travel.type === "Start") {
          return <StartEnd key={index} startCity={travel.city} endCity="" />;
        }
        if (travel.type === "End") {
          return <StartEnd key={index} startCity="" endCity={travel.city} />;
        }
        if (travel.type === "Transport") {
          return <Transport key={index} travel={travel} />;
        }
        if (travel.type === "Tour") {
          // find the index of the city of this travel in the cities array
          const cityIndex = cities.indexOf(travel.city);
          return <Tour key={index} travel={travel} citySerial={cityIndex} />;
        }
      })}
    </div>
  );
}
