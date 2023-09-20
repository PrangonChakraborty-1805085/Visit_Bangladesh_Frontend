import React, { useEffect, useState } from "react";
import WrappedMapWithRoutes from "../../components/Google/Destinations_new";
import Header_other from "../../components/Headers/Header_other";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinations,
  setEndDate,
  setPlan,
  setPreferences,
  setStartDate,
  setTotalBudget,
} from "../../redux/features/plan-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { auth } from "../../firebase/firebase";

export default function EditDestinations() {
  const allLocations = [
    { name: "Sylhet", lat: 24.886436, lng: 91.880722 },
    { name: "Dhaka", lat: 23.811056, lng: 90.407608 },
    { name: "Chittagong", lat: 22.3419, lng: 91.815536 },
    { name: "Rajshahi", lat: 24.3635886, lng: 88.6241351 },
    { name: "Barisal", lat: 22.701, lng: 90.3535 },
    { name: "Khulna", lat: 22.8456, lng: 89.5403 },
    { name: "Rangpur", lat: 25.7439, lng: 89.2752 },
    { name: "Mymensingh", lat: 24.7471, lng: 90.4203 },
  ];

  //state to store the selected destinations for showing in map
  const [selectedLocations, setSelectedLocations] = useState([]);

  // dispatch to store plan and other stuffs
  const dispatch = useDispatch();

  //loading state to render map
  const [mapLoading, setMapLoading] = useState(false);

  //current loggedin user state
  const [user, loading, error] = useAuthState(auth);

  // current location of user
  // const currentUserBrowsingCity = useSelector(
  //   (state) => state.persistedPlanReducer.value.userLocation
  // );

  //already selected destinations from plan slice
  const alreadySelectedDestinations = useSelector(
    (state) => state.persistedPlanReducer.value.destinations
  );
  // const alreadySelectedStartDate = useSelector(
  //   (state) => state.persistedPlanReducer.value.start_date
  // );
  // const alreadySelectedEndDate = useSelector(
  //   (state) => state.persistedPlanReducer.value.end_date
  // );

  //naviagtion helper
  const navigateTo = useNavigate();

  //states to store things
  const [dests, setDests] = useState(alreadySelectedDestinations);
  const [starttDate, setStarttDate] = useState("");
  const [enddDate, setEnddDate] = useState("");
  const [budget, setBudget] = useState("");

  //create a state to handle selected destinations
  const [selectedDestinations, setSelectedDestinations] = useState(
    alreadySelectedDestinations
  );

  const handleAddDestination = () => {
    setDests([...dests, ""]);
  };

  //preferences
  const preferences = [
    "Beach",
    "Mountain",
    "Historical",
    "Museum",
    "Water",
    "Nightlife",
    "Locality",
    "Wildlife",
    "Nature",
  ];
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleCheckboxChange = (event) => {
    const preference = event.target.value;
    if (event.target.checked) {
      // If the checkbox is checked, add the preference to the selectedPreferences array
      setSelectedPreferences((prevState) => [...prevState, preference]);
    } else {
      // If the checkbox is unchecked, remove the preference from the selectedPreferences array
      setSelectedPreferences((prevState) =>
        prevState.filter((item) => item !== preference)
      );
    }
  };

  // filter the allLocations and make a new array containing only those locations whose name matches with the alreadySelectedDestinations
  if (selectedLocations.length === 0) {
    let filteredLocations = [];
    for (let i = 0; i < alreadySelectedDestinations.length; i++) {
      const name = alreadySelectedDestinations[i];
      // now find the object from allLocations that contains the name as this name
      const location = allLocations.find((location) => location.name === name);
      filteredLocations.push(location);
    }
    setSelectedLocations(filteredLocations);
  }

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

    // filter the allLocations and make a new array containing only those locations whose name matches with the updatedDestinations
    let filteredLocations = [];
    for (let i = 0; i < updatedDestinations.length; i++) {
      const name = updatedDestinations[i];
      // now find the object from allLocations that contains the name as this name
      const location = allLocations.find((location) => location.name === name);
      filteredLocations.push(location);
    }
    setMapLoading(true); // Set loading to true before updating event

    // Simulate an asynchronous update (you can replace this with your actual update logic)
    setTimeout(() => {
      setSelectedLocations(filteredLocations);
      setMapLoading(false); // Set loading to false after update is complete
    }, 2000); // Simulated delay of 2 seconds
  };

  const handleStartDateChange = (e) => {
    setStarttDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEnddDate(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
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

    //TODO:modified for demonstration purpose
    // if (startDateObject < todayDateObject) {
    //   alert("Start date can not be before today");
    //   return;
    // }
    if (endDateObject < todayDateObject) {
      alert("End date can not be before today");
      return;
    }
    if (endDateObject < startDateObject) {
      alert("End date can not be before start date");
      return;
    }
    if (budget < 3000) {
      alert("Budget is too low");
      return;
    }

    const formData = {
      destinations: selectedDestinations.map((dest) => dest),
      starttDate,
      enddDate,
      budget,
    };
    dispatch(setDestinations(formData.destinations));
    dispatch(setStartDate(formData.starttDate));
    dispatch(setEndDate(formData.enddDate));
    dispatch(setPreferences(selectedPreferences));
    dispatch(setTotalBudget(formData.budget));

    //set the initial plan to null so that we can now create a new plan
    dispatch(setPlan(null));

    // print the form data
    // console.log("data in hero form : ", formData);
    // console.log("current user : ", username);
    if (!user) {
      // If user is logged in, navigate to username/day_by_day
      navigateTo("/random/allPlans");
    } else {
      // get the letters before '@' from the email
      const username = user.email.split("@")[0];
      navigateTo(`/${username}/allPlans`);
      // If user is not logged in, navigate to random/day_by_day
    }
  };
  return (
    <section className="text-gray-600 min-w-full min-h-screen bg-gray-200">
      <Header_other />
      <div className="container min-w-full flex flex-col">
        <div className="lg:w-full mx-auto max-h-screen relative">
          <div className="flex flex-col sm:flex-row mt-10 m-8">
            <div className="sm:w-2/3 text-center sm:pr-8 sm:py-8 flex flex-col items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto min-w-full mt-10 md:mt-0 shadow-lg"
              >
                <div className="">
                  {dests.map((destination, index) => {
                    const MainOptions = [
                      "Sylhet",
                      "Dhaka",
                      "Chittagong",
                      "Rajshahi",
                      "Barisal",
                      "Khulna",
                      "Rangpur",
                      "Mymensingh",
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
                  value={budget}
                  onChange={handleBudgetChange}
                  className="w-full p-[2%] md:p-[2%] lg:p-[2%] xl:p-[2%] my-1 md:my-1 lg:my-1 xl:my-1 border-[1px] border-gray-300 rounded outline-black"
                  placeholder="Your Approximate Budget"
                  required
                />
                {/* </div> */}
                <div className="grid grid-cols-3 gap-4 mt-3 mb-3">
                  {/* make checkbox for each options in the preferences */}
                  {preferences.map((preference, index) => {
                    return (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          name={preference}
                          value={preference}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={preference}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {preference}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg"
                >
                  Save
                </button>
                {/* <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p> */}
              </form>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-700 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              {!mapLoading && (
                <WrappedMapWithRoutes places={selectedLocations} />
              )}
              {mapLoading && <h1>loading...</h1>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
