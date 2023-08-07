import React, { useEffect, useState } from "react";
import "./travelplanupdated.css";
import { useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../Loading/Loading"; // Import the Loading component
import axios from "axios";

const TravelPlanUpdated = () => {
  const location = useLocation();
  const formData = location.state?.data;
  console.log("data in travel day by day plan : ", formData);
  //create data useState
  const [plan, setPlan] = useState(null);
  const fetchData = async () => {
    try {
      // Replace 'YOUR_BACKEND_API_URL' with the actual endpoint where you want to send the data
      const response = await axios.post(
        "http://localhost:8080/api/planner/initialPlan",
        formData
      );
      console.log("Response from backend:", response.data);
      setPlan(response.data);

      // Redirect to the day_by_day page after successful form submission
    } catch (error) {
      console.error("Error getting data from database:", error);
    }
  };
  fetchData();
  // console.log("data in travel day by day plan : ", data);

  // Create a wrapper component that takes props and renders DayByDay component
  const DayByDayWrapper = (props) => {
    const DayByDayComponent = lazy(() => import("./DayByDayPlan"));
    return <DayByDayComponent {...props} />;
  };

  console.log("data in travel day by day plan : ", plan);
  return (
    <Suspense fallback={<Loading />}>
      {plan && <DayByDayWrapper plan={plan} />}
    </Suspense>
  );
};

export default TravelPlanUpdated;
