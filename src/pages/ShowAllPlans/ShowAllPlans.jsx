import React, { useEffect, useState } from "react";
import Header_other from "../../components/Headers/Header_other";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Loading from "../../components/Loading/Loading";
import ShowPlanCard from "./ShowPlanCard";

export default function ShowAllPlans() {
  const [user, loading, error] = useAuthState(auth);
  const [allPlans, setAllPlans] = useState([]);
  const [plansloading, setPlansLoading] = useState(true);
  console.log("User", user);
  //print plansloading
  console.log("plans loading ", plansloading);
  useEffect(() => {
    async function fetchMyPlans() {
      try {
        console.log("sending request to fetch my all plans ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/getplans?email=${
            user.email
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setAllPlans(jsonData);
        setPlansLoading(false);
        console.log("My plans got from backend");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchMyPlans();
  }, [user?.email]);
  if (plansloading) {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <Loading />
      </section>
    );
  } else {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <h1 className="text-3xl font-bold text-black text-center mt-10 ">
          My Plans
        </h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {allPlans.map((plan, index) => (
              <ShowPlanCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}
