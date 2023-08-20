import React, { useState, useEffect } from "react";
import { setUserLocation } from "../../redux/features/plan-slice";
import { useDispatch } from "react-redux";

function LocationInfo() {
//   const [currentCity, setCurrentCity] = useState("Loading...");

  const fetchCityFromCoordinates = async (latitude, longitude) => {
    const apiKey = "AIzaSyC0jCLNe2ubZzaS13yDfxYRB2iXcU65qGE";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const dispatch = useDispatch(); // declaring the dispatch hook
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const city = getCityFromGeocodingResponse(data);
    //   setCurrentCity(city);
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
    setCurrentCity("Error fetching city");
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not available in this browser.");
      setCurrentCity("Geolocation not available");
    }
  }, []);

  return (
    <div>
      <p>Your current city: {currentCity}</p>
    </div>
  );
}

export default LocationInfo;
