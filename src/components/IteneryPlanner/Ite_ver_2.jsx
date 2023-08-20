import React, { useState } from "react";

export default function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options] = useState(["Sylhet", "Dhaka", "Chittagong", "Rajshahi", "Kushtia"]);

  const handleDestinationChange = (value) => {
    setDestination(value);

    if (value.length > 0) {
      const filtered = options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      setFilteredOptions(filtered);
      setDropdownVisible(true);
    } else {
      setFilteredOptions([]);
      setDropdownVisible(false);
    }
  };

  const handleSelectOption = (option) => {
    setDestination(option);
    setDropdownVisible(false);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Slow-carb next level shoindcgoitch ethical authentic, poko scenester
          </h1>
          <p className="leading-relaxed mt-4">
            Poke slow-carb mixtape knausgaard, typewriter street art gentrify
            hammock starladder roathse. Craies vegan tousled etsy austin.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="text-gray-900 font-extrabold text-4xl mb-5 text-center">
            Itinerary Planner
          </h1>
          <div className="relative mb-4">
            <input
              type="text"
              id="full-name"
              placeholder="Enter Destination"
              name="full-name"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {dropdownVisible && (
              <div className="absolute bg-white border border-gray-300 mt-1 w-full rounded shadow-lg">
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            See Your Trip
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p>
        </div>
      </div>
    </section>
  );
}
