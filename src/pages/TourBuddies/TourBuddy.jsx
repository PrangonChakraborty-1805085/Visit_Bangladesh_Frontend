import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header_other from "../../components/Headers/Header_other";
import Loading from "../../components/Loading/Loading";
import TourBuddyDayByDayPlan from "./TourBuddyDayByDayPlan";
import Mail from "./Mail";


export default function TourBuddy() {
  const location = useLocation();
  const [lloading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    async function fetchSinglePlan() {
      try {
        console.log(
          "sending request to fetch single tour buddy plan ..........."
        );
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("id");
        // console.log('search params', id)

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/getplan?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        //   console.log("plan got from backend ", jsonData);
        setTimeout(() => {
          setCurrentPlan(jsonData);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setLoading(true);
    fetchSinglePlan();
  }, [location.search]);
  if (lloading) {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <Loading />
      </section>
    );
  }
  return (
    <section className="text-gray-600 body-font relative">
      <Header_other />
      <div className=" right-0 w-full top-28 fixed">
        <Mail email={currentPlan.email} />
      </div>

      <TourBuddyDayByDayPlan plann={currentPlan} />
    </section>
  );
}
