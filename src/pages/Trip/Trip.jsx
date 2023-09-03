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

export default function Trip() {
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
    };
  });
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request ...........");
        const response = await fetch(
          "https://vb-backend-cbzw.onrender.com/api/planner/initialPlan",
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
        dispatch(setPlan(jsonData));
        setPlann(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPlanLoading(false);
      }
    }
    // check if already plan exists
    if (planData) {
      setPlann(planData);
      setPlanLoading(false);
    } else {
    // plan is not ready, fetch it first
    setPlanLoading(true);
    fetchData();
    }
  }, [planData, userInput, dispatch]);
  // const finalPlan = useSelector(
  //   (state) => state.persistedPlanReducer.value.plan
  // );

  //! for showing destinations in google map
  // const places = [
  //   { lat: 24.886436, lng: 91.880722 }, // Sylhet, BD
  //   { lat: 23.811056, lng: 90.407608 }, // Dhaka , BD
  //   { lat: 22.3419, lng: 91.815536 }, // Chittagong, BD
  //   // Add more places as needed
  // ];
  if (planLoading) {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <Loading />
      </section>
    );
  }
  else {
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
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-2/3 text-center sm:pr-8 sm:py-8 flex flex-col items-center justify-center ">
                <CityByCityRoute
                  startCity={currentUserBrowsingCity}
                  endCity={currentUserBrowsingCity}
                  destinations={plann.destinations}
                />
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-700 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <WrappedMapWithRoutes places={plann.destinations} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
