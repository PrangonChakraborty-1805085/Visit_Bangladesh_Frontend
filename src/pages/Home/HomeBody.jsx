import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../redux/features/plan-slice";

export default function HomeBody() {
  // const [currentCity, setCurrentCity] = useState("Loading...");
  const dispatch = useDispatch();

  const fetchCityFromCoordinates = async (latitude, longitude) => {
    const apiKey = "AIzaSyC0jCLNe2ubZzaS13yDfxYRB2iXcU65qGE";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const city = getCityFromGeocodingResponse(data);
      // setCurrentCity(city);
      dispatch(setUserLocation(city));
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const getCityFromGeocodingResponse = (responseData) => {
    const results = responseData.results;
    if (results.length > 0) {
      for (const component of results[0].address_components) {
        if (component.types.includes("locality")) {
          return component.long_name;
        }
      }
    }
    return "Unknown";
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCityFromCoordinates(latitude, longitude);
  };

  const error = (error) => {
    console.error("Error getting geolocation:", error.message);
    // setCurrentCity("Error fetching city");
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not available in this browser.");
      // setCurrentCity("Geolocation not available");
    }
  }, []);
  return (
    <section className="text-white body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
            You'll never travel without
            <br className="hidden lg:inline-block" />
            our trip planner again
          </h1>
          <p className="mb-8 leading-relaxed">
            Build, organize, and map your itineraries in a free travel app
            designed for vacations & road trips
          </p>
          <Link to="/create/plan">
            <div className="flex justify-center">
              <button className="inline-flex text-white border-2 border-white py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:border-indigo-600 rounded-full text-lg">
                Start Planning
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
