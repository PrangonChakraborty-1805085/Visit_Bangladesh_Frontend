import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor, store } from "./redux/store"; // Importing  Redux store
import React, { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import CreatePlan from "./pages/CreatePlan/CreatePlan";
import Trip from "./pages/Trip/Trip";
import Day_by_Day from "./pages/Day_by_Day/Day_by_Day";
import { plan } from "./Data";
import Search from "./pages/Search/Search";
import DestinationDescription from "./pages/DestinationDescription/DestinationDescription";
import EditPlan from "./pages/EditPlan/EditPlan";
import EditDestinations from "./pages/EditDestinations/EditDestinations";
import ShowAllPlans from "./pages/ShowAllPlans/ShowAllPlans";
import TourBuddies from "./pages/TourBuddies/TourBuddies";
import TourBuddy from "./pages/TourBuddies/TourBuddy";
import AllPlans from "./pages/CreateAllPlans/AllPlans";
// import emailjs from "@emailjs/browser";

// Define the ScrollToTopOnRouteChange component
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the route changes
  }, [pathname]);

  return null; // This component doesn't render anything
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route
        path="create/plan"
        element={
          <>
            <CreatePlan />
          </>
        }
      />
      <Route
        path="tourBuddy"
        element={
          <>
            <TourBuddy />
          </>
        }
      />
      <Route
        path=":username/allPlans"
        element={
          <>
            {/* <MapContainer /> */}
            <AllPlans />
          </>
        }
      />
      <Route
        path=":username/trip"
        element={
          <>
            {/* <MapContainer /> */}
            <Trip />
          </>
        }
      />
      <Route
        path=":username/myPlans"
        element={
          <>
            <ShowAllPlans />
          </>
        }
      />
      <Route
        path=":username/tourBuddies"
        element={
          <>
            <TourBuddies />
          </>
        }
      />
      <Route
        path=":username/trip/editDestinations"
        element={
          <>
            <EditDestinations />
          </>
        }
      />
      <Route
        path=":username/trip/day_by_day/edit"
        element={
          <>
            <EditPlan />
          </>
        }
      />
      <Route
        path=":username/trip/day_by_day"
        element={
          <>
            <Day_by_Day />
          </>
        }
      />
      <Route
        path="search"
        element={
          <>
            <Search />
          </>
        }
      />
      <Route
        path="destination/"
        element={
          <>
            <DestinationDescription />
          </>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}>
          <ScrollToTopOnRouteChange />
        </RouterProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
