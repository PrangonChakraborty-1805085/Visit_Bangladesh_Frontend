import React from "react";
import WrappedFoodPlacesMap from "../../components/Google/Restuarants";

export default function RestuarantCard({event}) {
  return (
    <div className="flex flex-col items-center justify-center min-w-full">
      <WrappedFoodPlacesMap event={event} />;
    </div>
  );
}
