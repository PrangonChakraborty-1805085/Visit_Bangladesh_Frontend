import React, { useState, useEffect } from "react";
import "./travelplanupdated.css";
import DayByDayPlan from "./DayByDayPlan";
import Loading from "./Loading";

import { useSelector } from "react-redux"; // this selector is used to grab the data from store

export default function TravelPlanUpdated() {
  // const planData = useSelector((state) => state.planReducer.value.plan);
  //create data useState
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const planData = useSelector((state) => {
    // console.log("Current State:", state); // Print the entire state object
    // console.log("planReducer:", state.persistedPlanReducer); // Print the planReducer
    // console.log("value:", state.persistedPlanReducer.value); // Print the value property of planReducer
    return state.persistedPlanReducer.value.plan; // Return the specific data you need
  });
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request ...........");
        const response = await fetch(
          "https://vb-backend-cbzw.onrender.com/api/planner/initialPlan",
          {
            method: "POST",
            body: JSON.stringify(planData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setPlan(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [planData]);
  // console.log("data in travel day by day plan : ", planData);
  // const fetchData = async (formData) => {
  //   try {
  //     if (response.ok) {
  //       const result = await response.json();
  //       return result;
  //     } else return null;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return null;
  //   }
  // };
  // const initialPlan = fetchData(planData);
  // setPlan(initialPlan);
  // setLoading(false);

  // console.log("data in travel day by day plan : ", plan);
  if (loading) return <Loading />;
  else return <DayByDayPlan plan={plan} />;
}
