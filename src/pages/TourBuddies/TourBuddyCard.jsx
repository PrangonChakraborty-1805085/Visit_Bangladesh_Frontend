import React from "react";
import { useNavigate } from "react-router-dom";

export default function TourBuddyCard({ buddy }) {
  const navigate = useNavigate();
  const handleTourBuddyClick = (e) => {
    e.preventDefault();
    navigate(
      `/tourBuddy?user=${buddy.email.split("@")[0]}&id=${buddy.plan_id}`
    );
  };
  return (
    <div
      onClick={handleTourBuddyClick}
      className="p-4 lg:w-1/4 md:w-1/2 cursor-pointer"
    >
      <div className="h-full flex flex-col items-center text-center">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
          src={buddy.image_url}
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">{}</h2>
          <h3 className="text-gray-800 mb-3">
            User : {buddy.email.split("@")[0]}
          </h3>
          <p className="mb-4 text-sm">
            {buddy.planname}
            <h1 className="text-lg text-blue-800">{buddy.date}</h1>
          </p>
        </div>
      </div>
    </div>
  );
}
