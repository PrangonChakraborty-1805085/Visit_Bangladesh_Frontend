import React, { useEffect, useState } from "react";
import { Box, Rating } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

import { useDispatch, useSelector } from "react-redux";
import Header_other from "../../components/Headers/Header_other";
import { AddSpotsCarousel } from "./AddSpotsCarousel";

import Modal from "@mui/material/Modal";
import { Typography } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import {
  resetAddedFromSuggestions,
  resetEditPlan,
  resetSuggestions,
  setSuggestions,
} from "../../redux/features/edit-plan-slice";
import PlanSuggestionsLoading from "./PlanSuggestionsLoading";
import { setPlan } from "../../redux/features/plan-slice";
// import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

export default function EditPlan() {
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //user info
  const [user, loading, error] = useAuthState(auth);

  //navigator
  const navigateTo = useNavigate();

  //update button state
  const [updateButtonPressed, setUpdateButtonPressed] = useState(false);

  //modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAll, setOpenAll] = React.useState(false);
  const handleOpenAll = () => setOpenAll(true);
  const handleCloseAll = () => setOpenAll(false);

  //delete items counter
  const [countDeleteItems, setCountDeleteItems] = useState(0);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [firstPlanUpdated, setFirstPlanUpdated] = useState(false);

  //get the edit plan from edit plan store
  const plan = useSelector((state) => state.persistedEditPlanReducer.plan);
  const date = useSelector((state) => state.persistedEditPlanReducer.date);

  //get the whole plan
  const wholePlan = useSelector(
    (state) => state.persistedPlanReducer.value.plan
  );

  //print the plan
  // console.log("plan in edit plan ", plan);

  //get the suggestions from redux
  const suggestions = useSelector(
    (state) => state.persistedEditPlanReducer.suggestions
  );
  const addedSpots = useSelector(
    (state) => state.persistedEditPlanReducer.addedFromSuggestions
  );

  //loading for getting new spots suggestions handler
  const [suggestionsloading, setSuggestionsLoading] = useState(true);
  const [morePlacesToGo, setMorePlacesToGo] = useState(null);
  const dispatch = useDispatch();

  //now send request to get the suggestions
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("sending request to fetch suggestions ...........");
        const requestBody = {
          plan: wholePlan,
          date: date,
        };
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/getsuggestion`,
          {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        console.log("plan got from backend ", jsonData);
        dispatch(setSuggestions(jsonData));
        setMorePlacesToGo(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSuggestionsLoading(false);
      }
    }
    // check if already suggestions exists
    if (suggestions) {
      setMorePlacesToGo(suggestions);
      setSuggestionsLoading(false);
    } else {
      // suggestions are not ready, fetch it first
      setSuggestionsLoading(true);
      fetchData();
    }
  }, []);

  if (plan && !firstPlanUpdated) {
    const updatedPlan = plan.cluster.map((planItem) => ({
      ...planItem,
      selected: false, // Add the selected field with an initial value of false
      deleted: false, // Add the deleted field with an initial value of false
    }));

    setCurrentPlan(updatedPlan);
    setFirstPlanUpdated(true);
  }

  const datee = new Date(date);
  const month = monthNames[datee.getMonth()];
  const presentDay = datee.getDate();
  // const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxSelect = (e) => {
    //get the id from this element
    const id = e.target.id;
    // now set the checked state to the corresponding event of current plan
    const updatedPlan = [...currentPlan]; // Create a shallow copy of the array
    updatedPlan[id].selected = e.target.checked; // Update the selected field of the selected event

    setCurrentPlan(updatedPlan); // Update the state

    if (e.target.checked) setCountDeleteItems(countDeleteItems + 1);
    else setCountDeleteItems(countDeleteItems - 1);
    if (countDeleteItems < 0) setCountDeleteItems(0);
  };

  return (
    <>
      <Header_other />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the selected spots?
          </Typography>
          <Button
            onClick={(e) => {
              e.preventDefault();
              // set the deleted value to true to all the selected items from the currentPlan
              const updatedPlan = [...currentPlan]; // Create a shallow copy of the array
              updatedPlan.forEach((event) => {
                if (event.selected) {
                  event.deleted = true;
                }
              });
              setCurrentPlan(updatedPlan); // Update the state
              setCountDeleteItems(0);
              handleClose();
            }}
            variant="outlined"
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            className="p-2 text-gray-900"
            variant="text"
          >
            No
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openAll}
        onClose={handleCloseAll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete all the spots?
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              // set the deleted value to true to all the selected items from the currentPlan
              const updatedPlan = [...currentPlan]; // Create a shallow copy of the array
              updatedPlan.forEach((event) => {
                event.deleted = true;
              });
              setCurrentPlan(updatedPlan); // Update the state
              setCountDeleteItems(0);
              handleCloseAll();
            }}
            variant="outlined"
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseAll}
            className="p-2 text-gray-900"
            variant="text"
          >
            No
          </Button>
        </Box>
      </Modal>
      <section className="text-gray-600 body-font overflow-hidden flex">
        <div className="px-5 py-10 mx-auto">
          <div className="-my-8 divide-y-2 flex flex-row  justify-center">
            <div className="w-1/2 flex flex-col items-center pt-2 ">
              <div className="w-full flex flex-row justify-start items-center">
                <h1 className="text-2xl font-semibold w-1/3 pl-2 ">
                  {month + " " + presentDay}
                </h1>
                <button
                  onClick={handleOpen}
                  className={`text-gray-800 bg-transparent border-2 border-gray-800 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white text-sm ${
                    !countDeleteItems ? `opacity-0` : ""
                  }`}
                >
                  Delete Selected
                </button>
                <button
                  onClick={handleOpenAll}
                  className={`text-gray-800 bg-transparent border-2 border-gray-800 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white text-sm ml-10`}
                >
                  Delete All
                </button>
              </div>

              {currentPlan?.map((event, index) => {
                if (event.id >= 0 && !event.deleted) {
                  return (
                    <div
                      key={index}
                      className="py-8  md:flex-nowrap rounded-lg shadow-lg mb-4 relative cursor-pointer "
                    >
                      <Checkbox
                        // checked={isChecked}
                        id={index}
                        {...label}
                        color="default"
                        onClick={handleCheckboxSelect}
                      />
                      <div className="flex flex-row items-center  min-h-full min-w-full  p-4">
                        <div className="md:w-64 md:mb-0 mb-6 flex flex-col  w-1/6">
                          <span className="mt-1 text-gray-500 text-sm">
                            {event.startTime}
                          </span>
                          <span className="mt-1 text-gray-500 text-sm">
                            {event.endTime}
                          </span>
                        </div>
                        <div className="md:flex-grow  w-5/6">
                          <img
                            alt="content"
                            className="object-cover object-center w-full"
                            src={event.imageURL}
                          />
                        </div>
                        <div className=" flex flex-col w-3/5 p-4 items-center justify-center m-2 ">
                          <h1 className="text-gray-950 text-base font-bold pb-1">
                            {event.name}
                          </h1>
                          <div className="flex flex-row items-center  pb-1">
                            <Rating
                              name="half-rating-read"
                              defaultValue={event.rating}
                              precision={0.5}
                              readOnly
                            />
                            <h1 className="">{event.rating}</h1>
                          </div>
                          <h1 className="text-gray-500  pb-1">
                            {" "}
                            {event.description.substring(
                              0,
                              event.description.indexOf(".") + 1
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="w-full pt-8 pb-4 text-black">
                <Typography variant="h4" gutterBottom>
                  More Places To Visit
                </Typography>
              </div>
              {suggestionsloading && (
                <div className="w-full h-96">
                  <PlanSuggestionsLoading />
                </div>
              )}
              {!suggestionsloading && (
                <AddSpotsCarousel newEvents={morePlacesToGo} />
              )}
              <div className="w-full flex items-center justify-center pb-4 pt-10">
                <button
                  disabled={updateButtonPressed}
                  onClick={async (e) => {
                    e.preventDefault();
                    setUpdateButtonPressed(true);
                    //change the text in this button to Updating
                    e.target.innerHTML = "Updating...";
                    // get the ids of the deleted events
                    let deletedEvents = [];
                    currentPlan.forEach((event) => {
                      if (event.deleted) {
                        deletedEvents.push(event.id);
                      }
                    });
                    console.log("deleted events ", deletedEvents);
                    console.log("added events ", addedSpots);

                    const finalAddedSpots = addedSpots;
                    const finalDeletedEvents = deletedEvents;

                    //finally clear the addedSpots
                    dispatch(resetAddedFromSuggestions());

                    console.log("sending request to update plan ...........");
                    const requestBody = {
                      plan: wholePlan,
                      date: date,
                      tourist_spot_add: finalAddedSpots,
                      tourist_spot_remove: finalDeletedEvents,
                    };
                    const response = await fetch(
                      `${import.meta.env.VITE_BACKEND_URL}/api/planner/update`,
                      {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const jsonData = await response.json();
                    //updating the final plan
                    dispatch(setPlan(jsonData));
                    // cleaning suggestions,edit plan stuffs
                    dispatch(resetSuggestions());
                    dispatch(resetEditPlan());
                    navigateTo(`/${user ? user.email : "random"}/trip`);
                  }}
                  className={`text-white bg-black border-2  py-2 px-10 focus:outline-none hover:bg-gray-700  text-lg font-medium w-full ${
                    updateButtonPressed ? "bg-gray-700" : ""
                  }`}
                >
                  Update Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
