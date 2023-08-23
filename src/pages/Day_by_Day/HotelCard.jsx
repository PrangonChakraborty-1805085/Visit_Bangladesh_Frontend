import React from "react";
import BookingWidget from "../../components/HotelBooking/BookingWidget";

export default function HotelCard({event}) {
  const eventt = {
    type: "hotel",
    place: "Shangsad Bhaban",
    lat: "23.733000",
    lng: "90.414000",
    startDate: "August 23,2023",
    endDate: "August 24,2023",
  };
  return (
    <div className="py-8 flex flex-col items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 ">
      <div className="flex flex-col items-center justify-evenly min-h-full  p-4">
        <BookingWidget
          latitude={event.lat}
          longitude={event.lng}
          landmarkName={event.place}
          address={event.place}
        />
      </div>
    </div>
  );
}