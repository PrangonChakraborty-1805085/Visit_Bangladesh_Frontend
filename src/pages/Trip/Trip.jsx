import React from "react";
import TripBar from "./TripBar";
import tripBackground from "./trip_background_6.jpg";
import { useSelector } from "react-redux";
import CityByCityRoute from "./CityByCityRoute";
import WrappedMapWithRoutes from "../../components/Google/Destinations_new";
import Header_other from "../../components/Headers/Header_other";

export default function Trip() {
  const currentUserBrowsingCity = useSelector(
    (state) => state.persistedPlanReducer.value.userLocation
  );
  const city = [currentUserBrowsingCity, "Sylhet", "Chattagram"];

  //! for showing destinations in google map
  const places = [
    { lat: 24.886436, lng: 91.880722 }, // Sylhet, BD
    { lat: 23.811056, lng: 90.407608 }, // Dhaka , BD
    { lat: 22.3419, lng: 91.815536 }, // Chittagong, BD
    // Add more places as needed
  ];
  return (
    <section className="text-gray-600 min-w-full min-h-screen">
      <Header_other />
      <div className="container min-w-full flex flex-col">
        <div className="lg:w-full mx-auto max-h-screen relative">
          <div className="rounded-lg max-h-[500px] w-full overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-1/6 w-full"
              src={tripBackground}
            />
          </div>
          <div className="absolute inset-0 flex mb-40 items-center justify-center bg-opacity-75">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              3 Days in Dhaka
            </h1>
          </div>
          <TripBar />
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-2/3 text-center sm:pr-8 sm:py-8 flex flex-col items-center justify-center ">
              <CityByCityRoute
                startCity={currentUserBrowsingCity}
                endCity={currentUserBrowsingCity}
              />
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-700 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <WrappedMapWithRoutes places={places} />
              {/* <p className="leading-relaxed text-lg mb-4">
                Meggings portland fingerstache lyft, post-ironic fixie man bun
                banh mi umami everyday carry hexagon locavore direct trade art
                party. Locavore small batch listicle gastropub farm-to-table
                lumbersexual salvia messenger bag. Coloring book flannel
                truffaut craft beer drinking vinegar sartorial, disrupt fashion
                axe normcore meh butcher. Portland 90's scenester vexillologist
                forage post-ironic asymmetrical, chartreuse disrupt butcher
                paleo intelligentsia pabst before they sold out four loko. 3
                wolf moon brooklyn.
              </p> */}
              {/* <a className="text-indigo-500 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
