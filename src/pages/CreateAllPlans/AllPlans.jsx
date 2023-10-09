import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import Header_other from "../../components/Headers/Header_other";
import { useNavigate } from "react-router-dom";
import {
  setDestinations,
  setPlan,
  setPlans,
} from "../../redux/features/plan-slice";
import WrappedMapWithRoutes from "../../components/Google/Destinations_new";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function AllPlans() {
  //navigator
  const navigateTo = useNavigate();

  //user state
  const [user, loading, error] = useAuthState(auth);

  const [planns, setPlanns] = useState(null);
  const dispatch = useDispatch();
  const [plansLoading, setPlansLoading] = useState(true);
  const planDatas = useSelector((state) => {
    return state.persistedPlanReducer.value.plans;
  });
  const userInput = useSelector((state) => {
    return {
      destinations: state.persistedPlanReducer.value.destinations,
      startDate: state.persistedPlanReducer.value.start_date,
      endDate: state.persistedPlanReducer.value.end_date,
      budget: state.persistedPlanReducer.value.budget,
      currentCity: "Dhaka",
      preferences: state.persistedPlanReducer.value.preferences,
    };
  });

  //destinations state to show in map
  const [mapDestinations, setMapDestinations] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  // const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(
          "sending request to get all the plans generated by backend ..........."
        );
        console.log("user input : ", userInput);
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
        // console.log("plan got from backend ", jsonData);
        //! default setting of destinations to the 2nd plan from plans
        setTimeout(() => {
          let filterdDestinations = [];
          for (let j = 0; j < jsonData[1].destinations.length - 1; j++) {
            //! modified
            filterdDestinations.push(jsonData[1].destinations[j]);
          }
          let resultDestinations = [];
          for (let j = 0; j < jsonData[1].destinations.length - 1; j++) {
            //! modified
            resultDestinations.push(jsonData[1].destinations[j].name);
          }
          setMapDestinations(filterdDestinations);
          setMapLoading(false);
          // dispatch(setPlan(jsonData[0]));
          dispatch(setDestinations(resultDestinations));
          dispatch(setPlans(jsonData));
          setPlanns(jsonData);
          setPlansLoading(false);
        }, 3000); // Simulated delay of 2 seconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // check if already plan exists
    if (!planDatas) {
      // plan is not ready, fetch it first
      // setPlanLoading(true);
      console.log("plan is not saved so calling ");
      fetchData();
    } else if (planDatas && mapLoading == true) {
      //! default setting of destinations to the 2nd plan from plans
      console.log("-------again printing my plan ", planDatas);

      setTimeout(() => {
        let filterdDestinations = [];
        for (let j = 0; j < planDatas[1].destinations.length - 1; j++) {
          //! modified
          filterdDestinations.push(planDatas[1].destinations[j]);
        }
        let resultDestinations = [];
        for (let j = 0; j < planDatas[1].destinations.length - 1; j++) {
          //! modified
          resultDestinations.push(planDatas[1].destinations[j].name);
        }
        setMapDestinations(filterdDestinations);
        dispatch(setDestinations(resultDestinations));
        // console.log("-------again printing my plan 1 ", planDatas);

        setPlanns(planDatas); //! modified
        setMapLoading(false);
        setPlansLoading(false);
      }, 2000); // Simulated delay of 2 seconds
      // console.log("-------again printing my plan 2 ", planDatas);
      // console.log("budget of plan0 ", planns[0].totalCost);
      // console.log("budget of plan0 ", planns[1].totalCost);
    }
  }, [dispatch, planDatas, userInput, mapLoading, planns]);

  //! for showing destinations in google map

  if (plansLoading) {
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
        <div className="flex flex-row min-w-full min-h-full sm:flex-row mt-10 bg-gray-100">
          <div className="flex flex-col w-full">
            {/* this is the plan 1 budget friendly */}
            <div
              onClick={(e) => {
                e.preventDefault();
                // setPlansLoading(true);
                // setTimeout(() => {
                dispatch(setPlan(planns[0]));
                // }, 2000);
                // setPlansLoading(false);

                if (!user) {
                  // If user is logged in, navigate to username/day_by_day
                  navigateTo("/random/trip");
                } else {
                  // get the letters before '@' from the email
                  const username = user.email.split("@")[0];
                  navigateTo(`/${username}/trip`);
                  // If user is not logged in, navigate to random/day_by_day
                }
              }}
              className="container w-full shadow-lg cursor-pointer"
            >
              <div className="p-4 lg:w-1/2 mb-5">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={planns[0].daybyday[0].cluster[0].imageURL}
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 className="title-font font-thin text-sm text-white bg-green-500 rounded-2xl p-2 text-center ">
                      Budget Friendly
                    </h2>
                    <h3 className="text-black mb-3 w-40 mt-2">
                      Total Estimated Cost {Math.ceil(planns[0].totalCost)} Taka
                    </h3>
                    <p className="mb-4 font-semibold text-2xl w-60">
                      {planns[0].planName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* this is the plan 2 most number of nodes */}
            <div
              onClick={(e) => {
                e.preventDefault();
                // setPlansLoading(true);
                // setTimeout(() => {
                dispatch(setPlan(planns[1]));
                // }, 2000);
                // setPlansLoading(false);

                if (!user) {
                  // If user is logged in, navigate to username/day_by_day
                  navigateTo("/random/trip");
                } else {
                  // get the letters before '@' from the email
                  const username = user.email.split("@")[0];
                  navigateTo(`/${username}/trip`);
                  // If user is not logged in, navigate to random/day_by_day
                }
              }}
              className="container w-full shadow-lg cursor-pointer"
            >
              <div className="p-4 lg:w-1/2 mb-5">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={planns[1].daybyday[0].cluster[0].imageURL}
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 className="title-font font-thin text-sm text-white bg-blue-500 rounded-2xl p-2 text-center w-full ">
                      Maximum Visit
                    </h2>
                    <h3 className="text-black mb-3 w-40 mt-2">
                      Total Estimated Cost {Math.ceil(planns[1].totalCost)} Taka
                    </h3>
                    <p className="mb-4 font-semibold text-2xl w-60">
                      {planns[1].planName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-700 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            {!mapLoading && <WrappedMapWithRoutes places={mapDestinations} />}
            {mapLoading && "Loading.."}
          </div>
        </div>
      </section>
    );
  }
}
