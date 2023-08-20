import React, { useState, useEffect } from "react";
import "./travelplanupdated.css";
import DayByDayPlan from "./DayByDayPlan";
import Loading from "./Loading";
import { useDispatch } from "react-redux"; // dispatch is used to call the setPlan function, it can not be called automatically
import { setPlan } from "../../redux/features/plan-slice";

import { useSelector } from "react-redux"; // this selector is used to grab the data from store

export default function TravelPlanUpdated() {
  // const planData = useSelector((state) => state.planReducer.value.plan);
  //create data useState
  const [plann, setPlann] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const planData = useSelector((state) => {
    return state.persistedPlanReducer.value.plan; // Return the specific data you need
  });
  const userInput = useSelector((state) => {
    return {
      destinations: state.planReducer.value.destinations,
      startDate: state.planReducer.value.start_date,
      endDate: state.planReducer.value.end_date,
      guest: state.planReducer.value.noOfGuests,
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
        dispatch(setPlan(jsonData));
        setPlann(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    // check if already plan exists
    if (planData != {}) {
      setPlann(planData);
      setLoading(false);
    } else {
      // plan is not ready, fetch it first
      fetchData();
    }
  }, [planData, userInput, dispatch]);
  if (loading)
    return (
      <div>
        <Loading numberOfDays={5} />;
      </div>
    );
  else
    return (
      <div>
        <DayByDayPlan plan={plann} />;
      </div>
    );
}
