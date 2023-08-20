import React from "react";

const LoadingDayByDayPlan = ({ numberOfDays }) => {
  const loadingItems = new Array(numberOfDays).fill(null);

  return (
    <div className="container">
      {loadingItems.map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="activities">
            <div className="activity">
              <div className="activity__name h-4 bg-gray-300 rounded"></div>
              <div className="activity__rating h-3 bg-gray-200 rounded"></div>
              <div className="activity__time h-3 bg-gray-200 rounded"></div>
            </div>
            {/* Repeat similar structure for other activities */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingDayByDayPlan;
