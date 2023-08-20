import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const FoodPlacesMap = (props) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetchFoodPlaces();
  }, []);

  const fetchFoodPlaces = (center) => {
    const cardDiv = document.createElement("div");

    const service = new props.google.maps.places.PlacesService(cardDiv);
    service.nearbySearch(
      {
        location: center,
        radius: 1000,
        type: ["restaurant", "cafe"],
      },
      (results, status) => {
        if (status === props.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      }
    );
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const handleMarkerMouseover = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerMouseout = () => {
    setSelectedPlace(null);
  };

  const handleMapMouseover = (mapProps, map) => {
    const center = map.getCenter();
    const centerLat = center.lat();
    const centerLng = center.lng();
    fetchFoodPlaces({ lat: centerLat, lng: centerLng });
  };

  return (
    <div className="w-2/5">
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Food Places Map</h1>
        <div className="w-full h-64 relative">
          <Map
            google={props.google}
            zoom={14}
            style={{ width: "100%", height: "100%" }}
            initialCenter={{
              lat: 23.811056,
              lng: 90.407608,
            }}
            onMouseover={handleMapMouseover}
          >
            {places.map((place) => (
              <Marker
                key={place.place_id}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                onClick={() => handleMarkerClick(place)}
                onMouseover={() => handleMarkerMouseover(place)}
                onMouseout={handleMarkerMouseout}
              />
            ))}
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
          </Map>
        </div>
      </div>
    </div>
  );
};
const WrappedFoodPlacesMap = GoogleApiWrapper({
  apiKey: "AIzaSyC0jCLNe2ubZzaS13yDfxYRB2iXcU65qGE",
})(FoodPlacesMap);
// Add prop type validation for the 'google' prop
WrappedFoodPlacesMap.propTypes = {
  google: PropTypes.object.isRequired,
  // Add prop type validation for other props here
};
export default WrappedFoodPlacesMap;
