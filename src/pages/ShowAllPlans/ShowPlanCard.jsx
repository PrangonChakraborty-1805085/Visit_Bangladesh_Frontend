import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Box, Rating } from "@mui/material";
import { setPlan } from "../../redux/features/plan-slice";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function ShowPlanCard({ plan }) {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  //print the plan
  console.log("plan ", plan);

  //modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log("in close modal");
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => {
    // console.log("in delete close modal");
    setOpenDelete(false);
  };

  //dispatch for redux stuff
  const dispatch = useDispatch();

  //loading stuff to get single plan
  const [planGettingLoading, setPlanGettingLoading] = useState(false);

  //modal helper
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

  return (
    <div id={plan.plan_id} className="p-4 lg:w-1/4 md:w-1/2">
      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            Are you sure you want to delete the plan?
          </Typography>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClose();
              document.getElementById(`myPlanDelete${plan.plan_id}`).innerHTML =
                "Deleting";
              //set the opacity to 0.2
              document.getElementById(
                `myPlanDelete${plan.plan_id}`
              ).style.opacity = "0.2";
              async function deleteSinglePlan() {
                try {
                  console.log(
                    "sending request to delete single plan ..........."
                  );

                  const response = await fetch(
                    `${
                      import.meta.env.VITE_BACKEND_URL
                    }/api/planner/delete?id=${plan.plan_id}`,
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
                  console.log("deleted successfully");
                  // navigate(`/${substringBeforeAtSymbol}/myPlans`);
                  location.reload();
                } catch (error) {
                  console.error("Error deleting plan:", error);
                }
              }
              deleteSinglePlan();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleDeleteClose}
            className="p-2 text-gray-900"
            variant="text"
          >
            No
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            Your current plan progress will be lost
          </Typography>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              document.getElementById(`${plan.plan_id}`).style.opacity = "0.2";

              // send a request to get the plan with this plan id , after getting this plan, dispatch the plan and navigate to trip page
              async function fetchSinglePlan() {
                try {
                  console.log(
                    "sending request to fetch single plan ..........."
                  );

                  const response = await fetch(
                    `${
                      import.meta.env.VITE_BACKEND_URL
                    }/api/planner/getplan?id=${plan.plan_id}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const jsonData = await response.json();
                  //   console.log("plan got from backend ", jsonData);
                  dispatch(setPlan(jsonData));
                  setPlanGettingLoading(false);
                  const email = user.email;
                  const parts = email.split("@");
                  const substringBeforeAtSymbol = parts[0];
                  navigate(`/${substringBeforeAtSymbol}/trip`);
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
              }
              setPlanGettingLoading(true);
              fetchSinglePlan();
              //   handleClose();
            }}
          >
            Continue
          </Button>
          <Button
            onClick={handleClose}
            className="p-2 text-gray-900"
            variant="text"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <div className="h-full flex flex-col items-center text-center">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
          src={plan.image_url}
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">{}</h2>
          <h3 className="text-gray-800 mb-3">Date : {plan.date}</h3>
          <p className="mb-4 text-sm">
            {plan.planname}
            ...
          </p>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <Button
            onClick={handleOpen}
            className="p-2 text-gray-900"
            variant="outlined"
          >
            Show
          </Button>
          <Button
            onClick={handleDeleteOpen}
            className="p-2 text-gray-900"
            variant="outlined"
            color="error"
            id={`myPlanDelete${plan.plan_id}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
