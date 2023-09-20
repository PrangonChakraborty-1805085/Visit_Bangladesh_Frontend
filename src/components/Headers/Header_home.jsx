import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import SignUp_Modal from "../../pages/SignUp/SignUp_Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { deepPurple } from "@mui/material/colors";
// import Button from "@mui/material/Button";
import SignUp_Login_Form from "../../pages/SignUp/SignUp_Login_Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

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

  const [search, setSearch] = useState("");

  const navigateTo = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    //check if search is empty
    if (search === "") {
      return;
    }
    // create a route containing the search as query=search and navigate to that
    navigateTo("/search?query=" + search);
  };

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
  const handleMyPlans = (e) => {
    e.preventDefault();
    const email = user.email;
    const parts = email.split("@");
    const substringBeforeAtSymbol = parts[0];
    navigateTo(`/${substringBeforeAtSymbol}/myPlans`);
  };
  const handleSearchForTours = (e) => {
    e.preventDefault();
    const email = user.email;
    const parts = email.split("@");
    const substringBeforeAtSymbol = parts[0];
    navigateTo(`/${substringBeforeAtSymbol}/tourBuddies`);
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
          className={`flex title-font font-medium items-center mb-4 md:mb-0 text-white mr-10`}
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
        <form className="flex flex-grow items-center justify-center">
          <div className="relative w-full flex flex-row items-center justify-center mr-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="w-4 h-4 text-gray-100 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full p-4 h-12 pl-10 text-sm text-white border border-gray-100 bg-transparent  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-white"
              placeholder="Search destinations"
              required
            />
            <button
              onClick={handleSearch}
              className="text-gray-800 bg-gray-800 focus:ring-4 focus:outline-none  font-medium text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <SendIcon className="text-white" />
            </button>
          </div>
        </form>
        {user && (
          <NavLink>
            <button
              onClick={handleSearchForTours}
              className={`inline-flex text-white items-center bg-transparent border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 mr-4 md:mt-0`}
            >
              Search for Tours
            </button>
          </NavLink>
        )}
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
              onClick={handleMyPlans}
              className={`inline-flex text-white items-center bg-transparent border-2 pl-6 pr-6 py-2 px-4 focus:outline-none hover:bg-gray-800 hover:text-white rounded-full text-base mt-4 mr-4 md:mt-0`}
            >
              My Plans
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
