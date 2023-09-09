import React, { useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { useLocation } from "react-router-dom";
import Header_other from "../../components/Headers/Header_other";
import Loading from "../../components/Loading/Loading";

export default function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const queryString = searchParams.get("query");
  // now search in the backend about this search url
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request from search ...........");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/search?query=${queryString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setSearchResults(jsonData);
        //   dispatch(setPlan(jsonData));
        // console.log("directions are : ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [queryString]);
  if (loading) {
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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {searchResults.map((place, index) => (
            <SearchCard key={index} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}
