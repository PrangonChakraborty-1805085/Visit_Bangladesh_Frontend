import React from "react";
import TouristSpotCard from "./TouristSpotCard";
import TravelCard from "./TravelCard";
import RestuarantCard from "./RestuarantCard";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditPlan } from "../../redux/features/edit-plan-slice";

export default function DayByDayPlan({ plann }) {
  const handleClick = (index) => {
    const targetElement = document.getElementById(`target-component ${index}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="text-gray-600 body-font overflow-hidden flex">
      <div className="px-5 py-10 mx-auto">
        <div className="-my-8 divide-y-2 flex flex-row justify-center min-w-full">
          {/* here new component will be added */}
          <div className="w-1/6 p-2 m-2 text-lg text-gray-600 fixed top-30 left-20">
            <div className=" flex flex-col  ">
              {plann.daybyday.map((daybydayplan, index) => {
                {
                  /* const date = new Date(daybydayplan.date); */
                }
                {
                  /* const month = monthNames[date.getMonth()]; */
                }
                {
                  /* const presentDay = date.getDate(); */
                }
                // get the month 1st 3 digit
                {
                  /* const presentDayMonth = presentDay.split(" ")[0].slice(0, 3); */
                }
                // make it so that 1st letter capital and all other small
                {
                  /* const presentDayMonthCapitalized =
                  presentDayMonth.charAt(0).toUpperCase() +
                  presentDayMonth.slice(1).toLowerCase(); */
                }
                {
                  /* const displayString = presentDayMonth + " " + presentDay; */
                }
                const clickedID = "clicked-element " + index;
                return (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleClick(index)}
                  >
                    <h1
                      id={clickedID}
                      className="cursor-pointer text-gray-400 hover:text-gray-700 text-xl font-bold"
                    >
                      {/* {displayString} */}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-3/6 flex flex-col items-center pt-2 ">
            {plann.daybyday.map((daybydayplan, index) => {
              const presentId = "target-component " + index;
              const date = new Date(daybydayplan.date);
              const month = monthNames[date.getMonth()];
              const presentDay = date.getDate();
              return (
                <div key={index}>
                  <div id={presentId} className="pb-4 pt-4"></div>
                  <div className="flex flex-row justify-start h-12 w-2/3 items-center">
                    <h1 className="text-2xl font-semibold w-1/3 min-h-full  pl-2 pt-2">
                      {month + " " + presentDay}
                    </h1>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const state = {
                          plan: daybydayplan,
                          date: daybydayplan.date,
                        };
                        dispatch(setEditPlan(state));
                        navigateTo("edit");
                      }}
                      className="text-white bg-gray-800 border-0 py-2 px-5 focus:outline-none hover:bg-gray-700 rounded-2xl text-lg"
                    >
                      Edit
                    </button>
                  </div>
                  {daybydayplan.cluster.map((event, index) => {
                    if (event.id >= 0)
                      return <TouristSpotCard key={index} event={event} />;
                    else return <RestuarantCard key={index} event={event} />;
                  })}
                  <HotelCard key={index} event={daybydayplan.hotel} />;
                </div>
              );
            })}
            {/* <TravelCard />
            <TouristSpotCard />
            <RestuarantCard />
            <HotelCard /> */}
          </div>
          {/* <div className="w-1/3">
            <div className="bg-yellow-950 flex justify-center h-full">
              <TouristSpotCard />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
