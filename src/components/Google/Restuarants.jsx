import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const FoodPlacesMap = ({ google, apiKey, event }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (!google) return;

    const map = new google.maps.Map(
      document.getElementById("map" + event.lat + event.lng),
      {
        zoom: 14,
        center: { lat: event.lat, lng: event.lng }, // Default center
      }
    );

    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: {
        lat: event.lat, // Default latitude
        lng: event.lng, // Default longitude
      },
      radius: 1500,
      type: "restaurant",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("results for rest ", results);
        setPlaces(results);
        renderNearbySearchResults(map, results);
      } else {
        console.error("Error fetching places:", status);
      }
    });
  }, [google]);

  const renderNearbySearchResults = (map, places) => {
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        title: place.name,
      });

      google.maps.event.addListener(marker, "click", () => {
        handleMarkerClick(place);
      });

      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerMouseover = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerMouseout = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="py-8 pt-5 flex flex-col items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 w-[50rem]">
      <div className="flex flex-col items-center justify-evenly min-h-full min-w-full  p-4">
        <h1 className="text-xl font-semibold mb-4 min-w-full">
          Food Places Near You
        </h1>
        <div
          className="min-w-full h-64 relative "
          id={"map" + event.lat + event.lng}
        >
          {selectedPlace && (
            <InfoWindow
              marker={selectedPlace}
              visible={true}
              onClose={handleMarkerMouseout}
            >
              <div className="p-2">
                <h2>{selectedPlace.name}</h2>
                <p>{selectedPlace.vicinity}</p>
                {/* Add more details here */}
              </div>
            </InfoWindow>
          )}
        </div>
      </div>
    </div>
  );
};

const WrappedFoodPlacesMap = GoogleApiWrapper({
  apiKey: "AIzaSyC0jCLNe2ubZzaS13yDfxYRB2iXcU65qGE",
})(FoodPlacesMap);

WrappedFoodPlacesMap.propTypes = {
  google: PropTypes.object.isRequired,
};

export default WrappedFoodPlacesMap;
