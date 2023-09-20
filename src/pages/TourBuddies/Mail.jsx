import React from "react";
import emailjs from "@emailjs/browser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Mail({ email }) {
  const [user, loading, error] = useAuthState(auth);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    // console.log("message written : ", document.getElementById("message").value);
    const message = document.getElementById("message").value;
    const to_email = document.getElementById("email").value;
    const serviceId = "service_54g0g1p";
    const templateId = "template_swl0qv6";
    try {
      emailjs.init("46rLz6Pu-5RVQv_Oz");
      document.getElementById("emailSendButton").innerHTML = "Sending...";
      await emailjs.send(serviceId, templateId, {
        from_name: user.email.split("@")[0],
        to_name: to_email.split("@")[0],
        from_email: user.email,
        to_email: email,
        message: message,
      });
      console.log("here I am ", user.email);
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
      document.getElementById("emailSendButton").innerHTML = "Send";
    }
  };
  return (
    // <div className="container px-5 py-24 mx-auto flex shadow-lg">
    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-lg">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Connect With the User
      </h2>
      <p className="leading-relaxed mb-5 text-gray-600">
        Communicate with the user to join with their plan
      </p>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-white rounded border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-400 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <button
        onClick={handleSendEmail}
        id="emailSendButton"
        className="text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg"
      >
        Send
      </button>
      {/* <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p> */}
    </div>
    //   </div>
  );
}
