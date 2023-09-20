import React, { useEffect, useState } from "react";
import Header_other from "../../components/Headers/Header_other";
import Loading from "../../components/Loading/Loading";
import TourBuddyCard from "./TourBuddyCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function TourBuddies() {
  const [lloading, setLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request from tour buddies ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/findtours`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        //now filter the jsonData so that no search result has the same email as the user
        const filteredData = jsonData.filter((result) => {
          return result.email !== user.email;
        });
        setSearchResults(filteredData);
        //   dispatch(setPlan(jsonData));
        // console.log("directions are : ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.email]);
  if (lloading) {
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <Loading />
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <Header_other />
      <h1 className="text-black font-extrabold text-3xl p-4">Shared Plans</h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {searchResults.map((buddy, index) => (
            <TourBuddyCard key={index} buddy={buddy} />
          ))}
        </div>
      </div>
    </section>
  );
}
