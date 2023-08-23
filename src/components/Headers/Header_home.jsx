import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import SignUp_Modal from "../../pages/SignUp/SignUp_Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
// import Button from "@mui/material/Button";
import SignUp_Login_Form from "../../pages/SignUp/SignUp_Login_Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../firebase/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 6,
  p: 4,
};

export default function Header_home() {
  // for signup modal component
  const [login, setLogin] = React.useState(false);

  const [user, loading, error] = useAuthState(auth);

  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    if (user) {
      setModalOpen(false);
    }
  }, [user]);

  const handleSignUpFormOpen = () => {
    setModalOpen(true);
    setLogin(false);
  };
  const handleLoginFormOpen = () => {
    setModalOpen(true);
    setLogin(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogOut = () => {
    logout();
  };
  return (
    <header className={`text-gray-800 bg-transparent fixed w-full top-0 z-10`}>
      {!user && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              {/* {loading && "loading"} */}
              <SignUp_Login_Form login={login} />
            </Box>
          </Fade>
        </Modal>
      )}
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          to="/"
          className={`flex title-font font-medium items-center mb-4 md:mb-0 text-white`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-10 h-10 p-2 rounded-full text-indigo-500 bg-white`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className={`ml-3 text-xl text-white`}>Visit Bangladesh</span>
        </NavLink>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"></nav>
        {!user && (
          <NavLink>
            <button
              onClick={handleLoginFormOpen}
              className={`inline-flex text-white items-center bg-transparent border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 mr-4 md:mt-0`}
            >
              Login
            </button>
          </NavLink>
        )}
        {!user && (
          <NavLink>
            <button
              onClick={handleSignUpFormOpen}
              className={`inline-flex text-white items-center border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 md:mt-0 border-white`}
            >
              Sign Up
            </button>
          </NavLink>
        )}
        {user && (
          <NavLink>
            <button
              onClick={handleLogOut}
              className={`inline-flex text-white items-center bg-transparent border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 mr-4 md:mt-0`}
            >
              Log out
            </button>
          </NavLink>
        )}
        {user ? (
          user.photoURL ? (
            <Avatar alt="" src={user?.photoURL} />
          ) : (
            <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
          )
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
