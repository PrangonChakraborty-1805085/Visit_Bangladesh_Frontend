// src/components/HeroForm.js
import { useState } from "react";
import {
  setDestinations,
  setEndDate,
  setStartDate,
  setNoOfGuests,
} from "../../redux/features/plan-slice"; // this is the plan slice where I will store the plan
import { useDispatch } from "react-redux"; // dispatch is used to call the setPlan function, it can not be called automatically

import { useNavigate } from "react-router-dom";
import "./heroform.css";

function HeroForm() {
  const [dests, setDests] = useState([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");

  const dispatch = useDispatch(); // declaring the dispatch hook

  const navigateTo = useNavigate();

  const handleAddDestination = () => {
    setDests([...dests, ""]);
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...dests];
    updatedDestinations[index] = value;
    setDests(updatedDestinations);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      destinations: dests.map((dest) => dest),
      startDate,
      endDate,
      guests,
    };
    dispatch(setDestinations(formData.destinations));
    dispatch(setStartDate(formData.startDate));
    dispatch(setEndDate(formData.endDate));
    dispatch(setNoOfGuests(formData.guests));
    // print the form data
    // console.log("data in hero form : ", formData);
    navigateTo("/day_by_day");
  };

  return (
    // <div className="hero">
    <div className="form-box">
      <div className="headline">Itinerary planner</div>

      <form className="input-group" onSubmit={handleSubmit}>
        {dests.map((destination, index) => (
          <input
            key={index}
            type="text"
            name={`destination-${index}`}
            value={destination}
            onChange={(e) => handleDestinationChange(index, e.target.value)}
            list="search-suggestions"
            className="input-field"
            placeholder="Enter Destination"
            required
          />
        ))}
        <datalist id="search-suggestions">
          <option value="Sylhet" />
          <option value="Dhaka" />
          <option value="Chittagong" />
          <option value="Rajshahi" />
          <option value="Kushtia" />
        </datalist>
        <div id="destinations">
          <button
            type="button"
            className="add-destination"
            onClick={handleAddDestination}
          >
            + Add Next Destination
          </button>
        </div>
        <input
          type="date"
          name="start_date"
          value={startDate}
          onChange={handleStartDateChange}
          className="start-date-field"
          placeholder="Starting Date"
          required
        />
        <input
          type="date"
          name="end_date"
          value={endDate}
          onChange={handleEndDateChange}
          className="end-date-field"
          placeholder="Ending Date"
          required
        />
        <input
          type="number"
          name="guest_num"
          value={guests}
          onChange={handleGuestsChange}
          className="input-field-guests"
          placeholder="Guests"
          required
        />
        <div className="button-box">
          <button type="submit" className="submit-btn">
            See Your Trip
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
}

export default HeroForm;
