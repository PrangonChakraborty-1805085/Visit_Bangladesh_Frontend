import React, { useEffect, useState } from "react";
import TripBar from "./TripBar";
import tripBackground from "./trip_background_6.jpg";
import { useDispatch, useSelector } from "react-redux";
import CityByCityRoute from "./CityByCityRoute";
import WrappedMapWithRoutes from "../../components/Google/Destinations_new";
// import Header_other from "../../components/Headers/Header_other";
import Header_home from "../../components/Headers/Header_home";
import { setPlan } from "../../redux/features/plan-slice";
import Loading from "../../components/Loading/Loading";
import Header_other from "../../components/Headers/Header_other";
import { useNavigate } from "react-router-dom";

export default function Trip() {
  //navigator
  const navigateTo = useNavigate();
  const currentUserBrowsingCity = useSelector(
    (state) => state.persistedPlanReducer.value.userLocation
  );
  const [plann, setPlann] = useState(null);
  const dispatch = useDispatch();
  const [planLoading, setPlanLoading] = useState(true);
  const planData = useSelector((state) => {
    return state.persistedPlanReducer.value.plan; // Return the specific data you need
  });
  const userInput = useSelector((state) => {
    return {
      destinations: state.persistedPlanReducer.value.destinations,
      startDate: state.persistedPlanReducer.value.start_date,
      endDate: state.persistedPlanReducer.value.end_date,
      guest: state.persistedPlanReducer.value.noOfGuests,
      currentCity: currentUserBrowsingCity,
    };
  });

  //destinations state to show in map
  const [mapDestinations, setMapDestinations] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  // const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request to get the trip ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/initialPlan`,
          {
            method: "POST",
            body: JSON.stringify(userInput),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        // console.log("plan got from backend");
        setTimeout(() => {
          let filterdDestinations = [];
          for (let j = 0; j < jsonData.destinations.length - 1; j++) {
            filterdDestinations.push(jsonData.destinations[j]);
          }
          setMapDestinations(filterdDestinations);
          setMapLoading(false);
          dispatch(setPlan(jsonData));
          setPlann(jsonData);
        }, 1000); // Simulated delay of 2 seconds
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPlanLoading(false);
      }
    }
    // check if already plan exists
    if (!planData) {
      // plan is not ready, fetch it first
      // setPlanLoading(true);
      fetchData();
    } else if (planData && mapLoading == true) {
      setTimeout(() => {
        let filterdDestinations = [];
        for (let j = 0; j < planData.destinations.length - 1; j++) {
          filterdDestinations.push(planData.destinations[j]);
        }
        setMapDestinations(filterdDestinations);
        setMapLoading(false);
      }, 1000); // Simulated delay of 2 seconds
    } else {
      if (planLoading === true) {
        setPlanLoading(false);
      }
    }
    // if (!mapDestinations) {
    //   setMapLoading(true); // Set loading to true before updating event

    //   // Simulate an asynchronous update (you can replace this with your actual update logic)
    //   setTimeout(() => {
    //     //remove the last destination from the plann.destinations
    //     let filterdDestinations = [];
    //     for (let j = 0; j < planData.destinations.length - 1; j++) {
    //       filterdDestinations.push(planData.destinations[j]);
    //     }
    //     setMapDestinations(filterdDestinations);
    //     setMapLoading(false); // Set loading to false after update is complete
    //   }, 1000); // Simulated delay of 2 seconds
    // }
  }, [dispatch, planData, planLoading, userInput,mapLoading]);

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
                {planData.planName}
              </h1>
            </div>
            <TripBar />
            <div className="flex flex-col sm:flex-row mt-10 bg-gray-100">
              <div className="sm:w-2/3 text-center sm:pr-8 sm:py-8 flex flex-col items-center justify-center">
                <CityByCityRoute
                  startCity={currentUserBrowsingCity}
                  endCity={currentUserBrowsingCity}
                  destinations={planData.destinations}
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
