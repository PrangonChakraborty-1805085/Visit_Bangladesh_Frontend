import React from "react";
import { Rating } from "@mui/material";
// import bandarban from "../../assets/bandarban_medium.jpg";

export default function DestinationInfo({ info }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={info.Image_Url}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {info.Name}
            {/* <br className="hidden lg:inline-block" />
            readymade gluten */}
          </h1>
          <p className="mb-8 leading-relaxed">{info.Description}</p>
          <div className="flex justify-center">
            <h2 className="text-">
              <Rating
                name="half-rating-read"
                defaultValue={info.Rating}
                precision={0.5}
                readOnly
              />
              {/* <h1 className="">{info.Rating}</h1> */}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
