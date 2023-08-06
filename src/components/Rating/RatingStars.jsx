import React from "react";
import "./ratingstars.css";

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i} className="star filled" />);
      } else if (i === filledStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star filled">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
};

export default RatingStars;
