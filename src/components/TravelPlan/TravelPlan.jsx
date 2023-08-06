import React from 'react';
import "./travelplan.css"

const TravelPlan = ({ plan }) => {
  return (
    <div className="container">
      {plan.map((activities, index) => (
        <div key={index}>
          {activities.length > 0 && (
            <div className="date">{activities[0].date}</div>
          )}
          <div className="activities">
            {activities.map((activity, index) => (
              <div key={index} className="activity">
                <div className="activity__name">{activity.name}</div>
                {activity.rating && (
                  <div className="activity__rating">{activity.rating}/5</div>
                )}
                {activity.description && (
                  <div className="activity__description">
                    {activity.description}
                  </div>
                )}
                <div className="activity__date">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelPlan;
