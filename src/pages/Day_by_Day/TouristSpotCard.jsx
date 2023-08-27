import { Rating } from "@mui/material";
import React from "react";

export default function TouristSpotCard({ event }) {
  // const eventt = {
  //   name: "Siddheshwari Kali Mandir",
  //   startTime: "9 am",
  //   endTime: "10.45am",
  //   lat: "22.644520",
  //   lng: "88.423480",
  //   rating: 3.5,
  //   description: "Hindu Temple",
  //   imageURL:
  //     "https://sritiochetona.org/wp-content/uploads/2020/06/FB_IMG_1592115991280.jpg",
  // };
  return (
    <div className="py-8 flex flex-row items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 ">
      <div className="flex flex-row items-center justify-evenly min-h-full  p-4">
        <div className="md:w-64 md:mb-0 mb-6 flex flex-col">
          <span className="mt-1 text-gray-500 text-sm">{event.startTime}</span>
          <span className="mt-1 text-gray-500 text-sm">{event.endTime}</span>
        </div>
        <div className="md:flex-grow ">
          <img
            alt="content"
            className="object-cover object-center  w-full"
            src={event.imageURL}
          />
        </div>
        <div className=" flex flex-col p-4 items-center justify-center m-2 ">
          <h1 className="text-gray-950 text-base font-bold pb-1">
            {event.name}
          </h1>
          <div className="flex flex-row items-center  pb-1">
            <Rating
              name="half-rating-read"
              defaultValue={event.rating}
              precision={0.5}
              readOnly
            />
            <h1 className="">{event.rating}</h1>
          </div>
          <h1 className="text-gray-500  pb-1"> {event.description}</h1>
        </div>
      </div>
    </div>
  );
}
