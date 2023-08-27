import React, { useState, useEffect } from "react";

export default function DayTimeline({ days }) {
  const [activeDay, setActiveDay] = useState(null);

  const handleDayClick = (index) => {
    setActiveDay(index);
    const target = document.getElementById(`day-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    for (let i = 0; i < days.length; i++) {
      const dayElement = document.getElementById(`day-${i}`);
      if (dayElement) {
        const dayPosition = dayElement.offsetTop;

        if (
          scrollY >= dayPosition &&
          scrollY < dayPosition + dayElement.offsetHeight
        ) {
          setActiveDay(i);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {days.map((day, index) => (
        <div
          key={index}
          className={`cursor-pointer text-center ${
            activeDay === index ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleDayClick(index)}
        >
          <div className="bg-blue-300 rounded-full p-2 m-2 w-12 h-12">
            {day.date.split(" ")[0]}
          </div>
          <div className="mb-4">{day.date.split(" ")[1]}</div>
        </div>
      ))}
    </div>
  );
}
