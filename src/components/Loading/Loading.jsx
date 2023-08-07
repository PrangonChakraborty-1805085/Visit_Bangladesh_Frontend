import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="container">
      {[1, 2, 3].map((_, index) => (
        <div key={index}>
          <div className="activities">
            <div className="activity">
              <div className="activity__name">
                <div className="blinking-box"></div>
              </div>
              <div className="activity__rating">
                <div className="blinking-box"></div>
              </div>
              <div className="activity__time">
                <div className="blinking-box"></div>
              </div>
            </div>
          </div>
          <div className="depart">
            <div className="blinking-box"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
