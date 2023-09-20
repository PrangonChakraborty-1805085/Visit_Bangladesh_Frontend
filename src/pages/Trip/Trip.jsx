import React, { useEffect, useState } from "react";
import TripBar from "./TripBar";
import tripBackground from "./bandarban2.jpg";
import { useDispatch, useSelector } from "react-redux";
import CityByCityRoute from "./CityByCityRoute";
import WrappedMapWithRoutes from "../../components/Google/Destinations_new";
// import Header_other from "../../components/Headers/Header_other";
import { setDestinations } from "../../redux/features/plan-slice";
import Loading from "../../components/Loading/Loading";
import Header_other from "../../components/Headers/Header_other";
import { useNavigate } from "react-router-dom";

export default function Trip() {
  //navigator
  const navigateTo = useNavigate();
  // const currentUserBrowsingCity = useSelector(
  //   (state) => state.persistedPlanReducer.value.userLocation
  // );
  const [plann, setPlann] = useState(null);
  const dispatch = useDispatch();
  const [planLoading, setPlanLoading] = useState(true);
  const planData = useSelector((state) => {
    return state.persistedPlanReducer.value.plan;
  });

  //destinations state to show in map
  const [mapDestinations, setMapDestinations] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  // const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      let filterdDestinations = [];
      for (let j = 0; j < planData.destinations.length - 1; j++) {
        //! modified
        filterdDestinations.push(planData.destinations[j]);
      }
      let resultDestinations = [];
      for (let j = 0; j < planData.destinations.length - 1; j++) {
        //! modified
        resultDestinations.push(planData.destinations[j].name);
      }
      setMapDestinations(filterdDestinations);
      dispatch(setDestinations(resultDestinations));
      setPlann(planData); //! modified
      setMapLoading(false);
      setPlanLoading(false);
    }, 2000); // Simulated delay of 2 seconds
    console.log("-------again printing my plan ", planData);
  }, [dispatch, planData, planLoading, mapLoading]);

  //! for showing destinations in google map

  if (planLoading) {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <Loading />
      </section>
    );
  } else {
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
                {plann.planName}
              </h1>
            </div>
            <TripBar />
            <div className="flex flex-col sm:flex-row mt-10 bg-gray-100">
              <div className="sm:w-2/3 text-center sm:pr-8 sm:py-8 flex flex-col items-center justify-center">
                <CityByCityRoute
                  startCity="Dhaka"
                  endCity="Dhaka"
                  destinations={plann.destinations}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("editDestinations");
                  }}
                  className="text-white bg-black border-0 py-2 px-10 focus:outline-none hover:bg-gray-700 rounded-2xl text-lg mt-5"
                >
                  Edit
                </button>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-700 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                {!mapLoading && (
                  <WrappedMapWithRoutes places={mapDestinations} />
                )}
                {mapLoading && "Loading.."}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
