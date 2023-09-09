import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux"; // this selector is used to grab the data from store

import {
  setDestinations,
  setEndDate,
  setStartDate,
  setNoOfGuests,
} from "../../redux/features/plan-slice"; // this is the plan slice where I will store the plan
import { useDispatch } from "react-redux"; // dispatch is used to call the setPlan function, it can not be called automatically

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function IteneryPlanner() {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch(); // declaring the dispatch hook
  const navigateTo = useNavigate();

  const [dests, setDests] = useState([""]);
  const [starttDate, setStarttDate] = useState("");
  const [enddDate, setEnddDate] = useState("");
  const [guests, setGuests] = useState("");

  //create a state to handle selected destinations
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const handleAddDestination = () => {
    setDests([...dests, ""]);
  };

  const handleDeleteDestination = (index) => {
    // here 2 case can happen,
    //1. the index of dests here passed can carry empty string "", then we need to remove the latest "" from dests,
    //2. the index of dests here passed can carry a string, then we need to remove the lastest value string from dests , also remove the value in this index from selectedDestinations if this value exits in the selectedDestinations
    const updatedDestinations = [...dests];
    if (updatedDestinations[index] === "") {
      updatedDestinations.pop();
    } else {
      updatedDestinations.pop();
      const updatedSelectedDestinations = [...selectedDestinations];
      const valueToBeDeleted = updatedSelectedDestinations[index];
      const indexOfValueToBeDeleted =
        updatedSelectedDestinations.indexOf(valueToBeDeleted);
      updatedSelectedDestinations.splice(indexOfValueToBeDeleted, 1);
      setSelectedDestinations(updatedSelectedDestinations);
    }
    setDests(updatedDestinations);
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...dests];
    updatedDestinations[index] = value;
    setDests(updatedDestinations);
    setSelectedDestinations(updatedDestinations);
  };

  const handleStartDateChange = (e) => {
    setStarttDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEnddDate(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //first validate the start and end dates. Check if the start date or end date is before today
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const todayDateString = `${todayYear}-${todayMonth}-${todayDate}`;
    const todayDateObject = new Date(todayDateString);
    const startDateObject = new Date(starttDate);
    const endDateObject = new Date(enddDate);
    if (startDateObject < todayDateObject) {
      alert("Start date can not be before today");
      return;
    }
    if (endDateObject < todayDateObject) {
      alert("End date can not be before today");
      return;
    }
    if (endDateObject < startDateObject) {
      alert("End date can not be before start date");
      return;
    }

    const formData = {
      destinations: selectedDestinations.map((dest) => dest),
      starttDate,
      enddDate,
      guests,
    };
    dispatch(setDestinations(formData.destinations));
    dispatch(setStartDate(formData.starttDate));
    dispatch(setEndDate(formData.enddDate));
    dispatch(setNoOfGuests(formData.guests));

    // print the form data
    // console.log("data in hero form : ", formData);
    // console.log("current user : ", username);
    if (!user) {
      // If user is logged in, navigate to username/day_by_day
      navigateTo("/random/trip");
    } else {
      // get the letters before '@' from the email
      const username = user.email.split("@")[0];
      navigateTo(`/${username}/trip`);
      // If user is not logged in, navigate to random/day_by_day
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-7xl text-white">
            You'll never travel without our trip planner again
          </h1>
          <p className="leading-relaxed mt-4 text-2xl text-white">
            Build, organize, and map your itineraries in a free travel app
            designed for vacations & road trips
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h1 className="text-gray-900 font-extrabold text-4xl mb-5 text-center">
            Itinerary Planner
          </h1>
          <div className="">
            {dests.map((destination, index) => {
              const MainOptions = [
                "Sylhet",
                "Dhaka",
                "Chittagong",
                "Rajshahi",
                "Kushtia",
              ];
              // now make a filteredOptions that includes that options that are not in the selectedDestinations
              const filteredOptions = MainOptions.filter(
                (option) => !selectedDestinations.includes(option)
              );
              return (
                <div key={index} className="flex mb-2">
                  <input
                    key={index}
                    type="text"
                    name={`destination-${index}`}
                    value={destination}
                    onChange={(e) =>
                      handleDestinationChange(index, e.target.value)
                    }
                    list={`search-suggestions-${index}`}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter Destination"
                    required
                  />
                  {index > 0 && (
                    <AiOutlineDelete
                      className="text-red-600 cursor-pointer ml-2 mt-1 text-2xl"
                      onClick={() => handleDeleteDestination(index)}
                    />
                  )}
                  <datalist id={`search-suggestions-${index}`}>
                    {filteredOptions.map((option, i) => {
                      {
                        /* console.log("filtered options are : ", filteredOptions); */
                      }
                      return <option key={i} value={option} />;
                    })}
                  </datalist>
                </div>
              );
            })}
            <div id="destinations">
              <button
                onClick={handleAddDestination}
                className="w-full px-0 py-2 border-0 text-left text-blue-500 bg-transparent text-md"
              >
                + Add Next Destination
              </button>
            </div>
          </div>
          {/* <div className="relative mb-4"> */}
          <input
            type="date"
            name="start_date"
            value={starttDate}
            onChange={handleStartDateChange}
            className="w-full p-[2%] md:p-[2%] lg:p-[2%] xl:p-[2%] my-1 md:my-1 lg:my-1 xl:my-1 border-[1px] border-gray-300 rounded outline-black"
            placeholder="Starting Date"
            required
          />
          <input
            type="date"
            name="end_date"
            value={enddDate}
            onChange={handleEndDateChange}
            className="w-full p-[2%] md:p-[2%] lg:p-[2%] xl:p-[2%] my-1 md:my-1 lg:my-1 xl:my-1 border-[1px] border-gray-300 rounded outline-black"
            placeholder="Ending Date"
            required
          />
          <input
            type="number"
            name="guest_num"
            value={guests}
            onChange={handleGuestsChange}
            className="w-full p-[2%] md:p-[2%] lg:p-[2%] xl:p-[2%] my-1 md:my-1 lg:my-1 xl:my-1 border-[1px] border-gray-300 rounded outline-black"
            placeholder="Guests"
            required
          />
          {/* </div> */}
          <button
            type="submit"
            className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg"
          >
            See your trip
          </button>
          {/* <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p> */}
        </form>
      </div>
    </section>
  );
}
