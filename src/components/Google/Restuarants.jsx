import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const FoodPlacesMap = (props) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  //   const myCurrentPlace = props.currentPlace;
  //   const myCurrentLat = myCurrentPlace.lat;
  //   const myCurrentLng = myCurrentPlace.lng;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request ...........");
        const response = await fetch(
          "https://vb-backend-cbzw.onrender.com/api/foodPlace/home",
          {
            method: "GET",
            //   body: JSON.stringify(userInput),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        //   dispatch(setPlan(jsonData));
        setPlaces(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        //   setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerMouseover = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerMouseout = () => {
    setSelectedPlace(null);
  };

  //! this is the custom marker icon for map showing
  const redIconSize = new props.google.maps.Size(40, 40); // Smaller size
  const customRedMarkerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon
    scaledSize: redIconSize,
  };
  const blueIconSize = new props.google.maps.Size(60, 60); // Larger size
  const customBlueMarkerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker icon
    scaledSize: blueIconSize,
  };

  return (
    <div className="py-8 pt-5 flex flex-col items-center justify-center md:flex-nowrap rounded-lg shadow-lg mb-4 w-[50rem]">
      <div className="flex flex-col items-center justify-evenly min-h-full min-w-full  p-4">
        <h1 className="text-xl font-semibold mb-4 min-w-full">
          Food Places Near You
        </h1>
        <div className="min-w-full h-64 relative ">
          <Map
            google={props.google}
            zoom={14}
            style={{ width: "100%", height: "100%" }}
            initialCenter={{
              lat: 23.746466,
              lng: 90.376015,
            }}
          >
            <Marker
              key={2}
              position={{
                lat: 23.746466,
                lng: 90.376015,
              }}
              icon={customBlueMarkerIcon} // Use the custom marker icon
              //   onMouseover={() => handleMarkerMouseover(place)}
              //   onMouseout={handleMarkerMouseout}
            />
            {places.map((place) => (
              <Marker
                key={place.place_id}
                position={{
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng,
                }}
                icon={customRedMarkerIcon} // Use the custom marker icon
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

WrappedFoodPlacesMap.propTypes = {
  google: PropTypes.object.isRequired,
};

export default WrappedFoodPlacesMap;
