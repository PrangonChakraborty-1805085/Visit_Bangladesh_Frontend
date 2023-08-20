import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

const MapWithRoutes = ({ google, apiKey }) => {
  //   const [directionsRenderer, setDirectionsRenderer] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const places = [
    { lat: 24.886436, lng: 91.880722 }, // Sylhet, BD
    { lat: 23.811056, lng: 90.407608 }, // Dhaka, BD
    { lat: 22.3419, lng: 91.815536 }, // Chittagong, BD
    // Add more places as needed
  ];

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         console.log("sending request ...........");
  //         const response = await axios.get(
  //           "https://vb-backend-cbzw.onrender.com/api/direction/home"
  //         );
  //         const jsonData = response.data;
  //         setDirectionsRenderer(jsonData);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  useEffect(() => {
    if (!google) return;

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: places.length > 0 ? places[0] : { lat: 91.815536, lng: 22.3419 },
    });

    const renderer = new google.maps.DirectionsRenderer({
      map,
    });

    const directionsService = new google.maps.DirectionsService();

    const waypoints = places.map((place) => ({
      location: place,
      stopover: true,
    }));

    const origin = waypoints[0].location;
    const destination = waypoints[waypoints.length - 1].location;

    const request = {
      origin,
      destination,
      waypoints: waypoints.slice(1, waypoints.length - 1),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        renderer.setDirections(result);
      }
    });
  }, [google]);

  return (
    <div className="w-3/4">
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <div className="w-full h-64 relative" id="map"></div>
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
