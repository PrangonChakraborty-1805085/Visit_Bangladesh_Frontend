import React, { useEffect, useState } from "react";
import TripBar from "../Trip/TripBar";
import DayByDayPlan from "./DayByDayPlan";
import Header_other from "../../components/Headers/Header_other";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import { document } from "postcss";
import { setPlanPublic } from "../../redux/features/plan-slice";

export default function Day_by_Day() {
  const [isTripBarFixed, setIsTripBarFixed] = useState(false);

  //dispatch to store things in redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(
    (state) => state.persistedPlanReducer.value.plan
  );
  // console.log("current plan in daybyday ", currentPlan);
  //modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log("in close modal");
    setOpen(false);
  };

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

  const handleScroll = () => {
    // Calculate the position of the end of the TripBar component
    const tripBarHeight = document.getElementById("trip-bar").offsetHeight;
    const tripBarBottomPosition = tripBarHeight + 20; // Adjust as needed

    // Check if the user has scrolled past the end of the TripBar
    if (window.scrollY > tripBarBottomPosition) {
      setIsTripBarFixed(true);
    } else {
      setIsTripBarFixed(false);
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className=" flex flex-col min-h-screen">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            Make your plan public so that others can see your plan
          </Typography>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              e.target.innerHTML = "Making plan public...";
              //set the opacity to 0.2
              e.target.style.opacity = "0.2";
              //disable it
              e.target.disabled = true;
              async function makePublic() {
                try {
                  console.log(
                    "sending request to make  plan public ..........."
                  );

                  const response = await fetch(
                    `${
                      import.meta.env.VITE_BACKEND_URL
                    }/api/planner/changetype?id=${currentPlan.planID}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const jsonData = await response.json();
                  //   console.log("plan got from backend ", jsonData);
                  // const email = user.email;
                  // const parts = email.split("@");
                  // const substringBeforeAtSymbol = parts[0];
                  dispatch(setPlanPublic());
                  // console.log("plan made public successfully");
                  // navigate(`/${substringBeforeAtSymbol}/myPlans`);
                  location.reload();
                } catch (error) {
                  console.error("Error deleting plan:", error);
                }
              }
              makePublic();
            }}
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
      <div className="min-w-full flex flex-col">
        <Header_other />
        <div
          className={`${
            isTripBarFixed
              ? "fixed top-0 w-full z-50 transition ease-in-out bg-white"
              : ""
          }`}
          id="trip-bar"
        >
          <TripBar />
          {/* <div className="w-full h-10 flex flex-row-reverse">
     
          </div> */}
        </div>
        {currentPlan.type === "private" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              //first check if the planid is -1
              if (currentPlan.planID == -1) {
                // document
                //   .getElementById("saveAlert")
                //   .innerHTML("Save your plan first");
                //call an alert
                alert("Save your plan first");
              } else {
                handleOpen();
              }
            }}
            id="public"
            className="text-black mt-2 border-2 border-gray-900 bg-transparent py-2 px-5 focus:outline-none hover:bg-gray-100 text-lg"
          >
            Need a tour buddy?
          </button>
        )}
        {/* <h1 id="saveAlert" className="text-red-900 font-semibold mt-2"></h1> */}
      </div>
      <DayByDayPlan plann={currentPlan} />
    </div>
  );
}
