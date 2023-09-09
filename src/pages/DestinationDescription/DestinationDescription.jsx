import React, { useEffect, useState } from "react";
import DestinationInfo from "./DestinationInfo";
import MorePlacesInfo from "./MorePlacesInfo";
import { useLocation } from "react-router-dom";
import Header_other from "../../components/Headers/Header_other";
import Loading from "../../components/Loading/Loading";

export default function DestinationDescription() {
  const location = useLocation();
  const { id, place } = location.state;
  const [loading, setLoading] = useState(true);

  const [moreInfo, setMoreInfo] = useState();
  useEffect(() => {
    setLoading(true); // here whenever this component mounts, the loading will be on
    async function fetchData() {
      try {
        console.log("sending request from search ...........");
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/search/tourist_spot?tourist_spot_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setMoreInfo(jsonData);
        //   dispatch(setPlan(jsonData));
        // console.log("directions are : ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    console.log("loading started.............");
    return (
      <section className="text-gray-600 body-font">
        <Header_other />
        <DestinationInfo info={place} />
        <Loading />
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <Header_other />
      <DestinationInfo info={place} />
      <MorePlacesInfo morePlaces={moreInfo.similar_tourist_spots} />
    </section>
  );
}
