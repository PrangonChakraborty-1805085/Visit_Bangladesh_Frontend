import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { NavLink } from "react-router-dom";
import { Store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user-slice";

import {
  // auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";

export default function SignUp_Login_Form({ login }) {
  // dispatch creation
  const dispatch = useDispatch();
  const notification = {
    title: "Welcome to Visit Bangladesh!",
    message: "You have logged in successfully",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
  };

  //state for storing email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // const [user, loading, error] = useAuthState(auth);

  const [isLogin, setIsLogin] = useState(login);
  const handleGoogleSignUpOrLogin = (event) => {
    event.preventDefault();
    signInWithGoogle().then((result) => {
      if (result.user === null) {
        Store.addNotification({
          ...notification,
          type: "danger",
          title: result.status,
          message: "Try again",
          dismiss: {
            duration: 2000,
            pauseOnHover: true,
          },
          touchSlidingExit: {
            swipe: {
              duration: 1000,
              timingFunction: "ease-out",
              delay: 0,
            },
            fade: {
              duration: 1000,
              timingFunction: "ease-out",
              delay: 0,
            },
          },
        });
      } else {
        Store.addNotification({
          ...notification,
          dismiss: {
            duration: 2000,
            pauseOnHover: true,
          },
          touchSlidingExit: {
            swipe: {
              duration: 1000,
              timingFunction: "ease-out",
              delay: 0,
            },
            fade: {
              duration: 1000,
              timingFunction: "ease-out",
              delay: 0,
            },
          },
        });
        //dispatch the user
        dispatch(setUser(result.user));
      }
    });
  };
  const handleSignUpOrLogin = (event) => {
    event.preventDefault();
    if (isLogin) {
      // handle login with email and password by google
      logInWithEmailAndPassword(email, password).then((result) => {
        if (result.user === null) {
          Store.addNotification({
            ...notification,
            type: "danger",
            title: result.status,
            message: "Try again",
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
        } else {
          Store.addNotification({
            ...notification,
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
          //dispatch the user
          dispatch(setUser(result.user));
        }
      });
    } else {
      // handle sign up with email and password by google
      registerWithEmailAndPassword(username, email, password).then((result) => {
        if (result.user === null) {
          Store.addNotification({
            ...notification,
            type: "danger",
            title: result.status,
            message: "Try again",
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
        } else {
          Store.addNotification({
            ...notification,
            message: "You have signed up successfully",
            dismiss: {
              duration: 2000,
              pauseOnHover: true,
            },
            touchSlidingExit: {
              swipe: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
              fade: {
                duration: 1000,
                timingFunction: "ease-out",
                delay: 0,
              },
            },
          });
          //dispatch the user
          dispatch(setUser(result.user));
        }
      });
    }
  };
  const handleSwitchState = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="lg:w-2/6 md:w-1/2  rounded-lg p-8 flex flex-col md:ml-auto min-h-full min-w-full mt-10 md:mt-0 bg-gray-100 justify-center">
      <div className="text-black text-2xl font-bold title-font mb-5 text-center">
        <h2>
          {isLogin === true ? "Log in to " : "Sign up with "}Visit Bangladesh
        </h2>
      </div>
      <div
        className="relative mb-4 flex flex-col items-center justify-center"
        onClick={handleGoogleSignUpOrLogin}
      >
        <button className=" flex flex-row items-center font-bold text-xl w-full h-16 bg-white rounded-3xl border hover:bg-gray-100 border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          <div className="flex flex-col items-start justify-center w-1/6 p-2">
            <GoogleIcon />
          </div>
          <div className="font-bold text-xl text-gray-500 pl-5">
            <h1> {isLogin === true ? "Log in " : "Sign up "}with Google</h1>
          </div>
        </button>
        <div className="pt-4 text-blue-600"> Or</div>
      </div>
      {!isLogin && (
        <div className="relative mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white rounded border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      )}

      <div className="relative mb-4">
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white rounded border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white rounded border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        onClick={handleSignUpOrLogin}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {isLogin ? "Log in" : "Sign up"}
      </button>
      <p className="text-xs text-gray-500 mt-3">
        {isLogin ? "Already have an account?" : "Don't have an account?"}
        <NavLink
          onClick={handleSwitchState}
          className="text-blue-700 ml-2 underline"
        >
          {isLogin ? "Sign up" : "Log in"}
        </NavLink>
      </p>
    </div>
  );
}
