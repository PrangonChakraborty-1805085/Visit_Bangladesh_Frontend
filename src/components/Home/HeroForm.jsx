// src/components/HeroForm.js
import { useState, Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "./heroform.css";
import Loading from "../Loading/Loading";

const HeroForm = () => {
  const [destinations, setDestinations] = useState([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");

  const navigateTo = useNavigate();

  const handleAddDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      destinations: destinations.map((dest) => dest),
      startDate,
      endDate,
      guests,
    };
    console.log("Form Data:", formData);
    navigateTo("/day_by_day", { state: { data: formData } });
  };

  return (
    <div className="hero">
      <div className="form-box">
        <div className="headline">Itinerary planner</div>

        <form className="input-group" onSubmit={handleSubmit}>
          {destinations.map((destination, index) => (
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
    </div>
  );
};

export default HeroForm;
