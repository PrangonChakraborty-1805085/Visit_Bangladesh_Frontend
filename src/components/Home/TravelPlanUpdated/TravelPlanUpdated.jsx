import React from "react";
import "./travelplanupdated.css";
import RatingStars from "../../Rating/RatingStars";
import { useLocation } from "react-router-dom";

const TravelPlanUpdated = () => {
  const location = useLocation();
  const plan = location.state?.data;
  console.log("data in travel day by day plan : ", plan);
  return (
    <div className="container">
      {plan.map((item, index) => (
        <div key={index}>
          {/* {item.type === "cluster" && (
            <div className="date">Day {index + 1}</div>
          )} */}
          {item.type === "cluster" && (
            <div className="activities">
              {item.value.map((activity, activityIndex) => (
                <div key={activityIndex} className="activity">
                  <div className="activity__name">{activity.name}</div>
                  {activity.rating && (
                    <div className="activity__rating">
                      <RatingStars rating={activity.rating} />
                    </div>
                  )}
                  <div className="activity__time">{activity.time} hours</div>
                </div>
              ))}
            </div>
          )}
          {item.type === "depart" && (
            <div className="depart">
              Depart from {item.start} to {item.end} ({item.time / 60} hours)
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelPlanUpdated;
