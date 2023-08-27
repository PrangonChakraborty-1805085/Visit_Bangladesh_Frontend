import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCard({ place }) {
  const navigate = useNavigate();
  const handleLocationClick = (e) => {
    e.preventDefault();
    const state = {
      id: place.Tourist_Spot_ID,
      place:place,
    };
    //request to backend to get all the info about this place
    navigate(`/destination?name=${place.Name}`, { state });
  };
  return (
    <div
      onClick={handleLocationClick}
      className="p-4 lg:w-1/4 md:w-1/2 cursor-pointer"
    >
      <div className="h-full flex flex-col items-center text-center">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
          src={place.Image_Url}
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">{}</h2>
          <h3 className="text-gray-800 mb-3">
            Location : {place.Location_Name}
          </h3>
          <p className="mb-4 text-sm">
            {place.Description.substring(0, place.Description.indexOf(".") + 1)}
            ...
            <h1 className="text-lg text-blue-800">see more...</h1>
          </p>
        </div>
      </div>
    </div>
  );
}
