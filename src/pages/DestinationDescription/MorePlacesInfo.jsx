import React from "react";
import bandarban from "../../assets/bandarban.jpg";
import MorePlaceInfoCard from "./MorePlaceInfoCard";

export default function MorePlacesInfo({ morePlaces }) {
  // const morePlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-extrabold title-font mb-2 text-gray-900">
              More Places To Visit..
            </h1>
            <div className="h-1 w-20 bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {morePlaces.map((place, index) => (
            <MorePlaceInfoCard key={index} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}
