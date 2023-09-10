//! here this component is not used because google-maps-react has no component or module named DirectionsRenderer

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Map,
  Marker,
  DirectionsRenderer,
  GoogleApiWrapper,
} from "google-maps-react";
import axios from "axios";

const MapWithRoutes = ({ google, placess, apiKey }) => {
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(true);

  const places = [
    { lat: 24.886436, lng: 91.880722 }, // Sylhet, BD
    { lat: 23.811056, lng: 90.407608 }, // Dhaka , BD
    { lat: 22.3419, lng: 91.815536 }, // Chittagong, BD
    // Add more places as needed
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request to get map with routes ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/direction/home`,
          {
            method: "GET",
            //   body: JSON.stringify(userInput),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setDirections(jsonData);
        //   dispatch(setPlan(jsonData));
        // console.log("directions are : ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-3/4">
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <div className="w-full h-64 relative">
          <Map
            google={google}
            zoom={5}
            initialCenter={
              places.length > 0 ? places[0] : { lat: 91.815536, lng: 22.3419 }
            }
          >
            {places.map((place, index) => (
              <Marker key={index} position={place} />
            ))}
            {loading && <h1>loading...</h1>}
            {!loading && <DirectionsRenderer directions={directions} />}
          </Map>
        </div>
      </div>
    </div>
  );
};

const WrappedMapWithRoutes = GoogleApiWrapper({
  apiKey: "AIzaSyC0jCLNe2ubZzaS13yDfxYRB2iXcU65qGE",
})(MapWithRoutes);

WrappedMapWithRoutes.propTypes = {
  google: PropTypes.object.isRequired,
};

export default WrappedMapWithRoutes;
