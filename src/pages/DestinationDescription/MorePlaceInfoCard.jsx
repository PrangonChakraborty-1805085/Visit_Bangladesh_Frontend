import React from "react";
import { useNavigate } from "react-router-dom";

export default function MorePlaceInfoCard({ place }) {
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
    <div onClick={handleLocationClick} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer">
      <div className="bg-gray-100 p-6 rounded-lg">
        <img
          className="h-40 rounded w-full object-cover object-center mb-6"
          src={place.Image_Url}
          alt="content"
        />
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {place.Location_Name}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {place.Name}
        </h2>
        <p className="leading-relaxed text-base">
          {place.Description.substring(0, place.Description.indexOf(".") + 1)}
        </p>
      </div>
    </div>
  );
}
