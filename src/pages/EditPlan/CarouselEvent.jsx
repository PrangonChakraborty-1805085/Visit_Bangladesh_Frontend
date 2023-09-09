import React from "react";
import { addFromSuggestions } from "../../redux/features/edit-plan-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function CarouselEvent({ event }) {
  const dispatch = useDispatch();
  const [addPressed, setAddPressed] = useState(false);
  return (
    <div className=" md:w-1/3 sm:mb-0 mb-6 min-w-full relative">
      <img
        alt="content"
        className="object-cover h-60 w-full"
        src={event.image_url}
      />
      <h2 className="p-2 text-xl font-medium title-font text-gray-900 mt-5">
        {event.place}
      </h2>
      <p className="text-base leading-relaxed mt-2 pb-2 mb-2">
        {event.description.substring(0, event.description.indexOf(".") + 1)}
      </p>
      <div className="w-full flex items-center justify-center pb-4">
        <button
          id={event.id}
          disabled={addPressed}
          onClick={(e) => {
            e.preventDefault();
            setAddPressed(true);
            dispatch(addFromSuggestions(event.id));
            console.log("pressed");
          }}
          className={`text-white bg-black border-2  py-2 px-10 focus:outline-none hover:bg-gray-700  text-lg font-medium ${
            addPressed ? "bg-gray-700" : ""
          }`}
        >
          {addPressed ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}
