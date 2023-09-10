import React from "react";
import StartEnd from "./StartEnd";
import Transport from "./Transport";
import Tour from "./Tour";

export default function CityByCityRoute({ startCity, endCity, destinations }) {
  let cities = [];
  for (let i = 0; i < destinations.length; i++) {
    cities.push(destinations[i].name);
  }
  let travels = [
    {
      type: "Start",
      city: startCity,
    },
  ];
  if (destinations[0].name !== startCity) {
    travels.push({
      type: "Transport",
      distance: Math.ceil(destinations[0].distance),
      time: Math.ceil(destinations[0].time),
    });
  }
  travels.push({
    type: "Tour",
    city: destinations[0].name,
    days: destinations[0].days,
  });
  for (let i = 1; i < destinations.length - 1; i++) {
    travels.push({
      type: "Transport",
      distance: Math.ceil(destinations[i].distance),
      time: Math.ceil(destinations[i].time),
    });
    travels.push({
      type: "Tour",
      city: destinations[i].name,
      days: destinations[i].days,
    });
  }
  if (Math.ceil(destinations[destinations.length - 1].distance) !== 0.0) {
    travels.push({
      type: "Transport",
      distance: Math.ceil(destinations[destinations.length - 1].distance),
      time: Math.ceil(destinations[destinations.length - 1].time),
    });
  }
  travels.push({
    type: "End",
    city: endCity,
  });
  return (
    <div className="flex flex-col  items-start justify-start shadow-lg w-full ml-5 pl-2">
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
          return (
            <Tour key={index} travel={travel} citySerial={cityIndex + 1} />
          );
        }
      })}
    </div>
  );
}
