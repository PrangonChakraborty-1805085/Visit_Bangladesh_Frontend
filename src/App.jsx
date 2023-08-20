// import React from 'react';
// import HeroForm from "./components/Home/HeroForm";
// import TravelPlan from "./components/TravelPlan/TravelPlan";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor, store } from "./redux/store"; // Importing  Redux store
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
// import TravelPlanUpdated from "./components/TravelPlanUpdated/TravelPlanUpdated";
import Home from "./pages/Home/Home";
import CreatePlan from "./pages/CreatePlan/CreatePlan";
// import LocationInfo from "./components/GeoLocationInfo/LocationInfo";
// import WrappedFoodPlacesMap from "./components/Google/RestuarantMap";
import MapContainer from "./components/Google/deprecated_MapContainer";
import WrappedFoodPlacesMap from "./components/Google/Restuarants";
import Trip from "./pages/Trip/Trip";
import Day_by_Day from "./pages/Day_by_Day/Day_by_Day";


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
        path=":username/trip"
        element={
          <>
            {/* <MapContainer /> */}
            <Trip />
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
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
