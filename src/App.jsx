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
import Home from "./pages/Home/Home";
import CreatePlan from "./pages/CreatePlan/CreatePlan";
import Trip from "./pages/Trip/Trip";
import Day_by_Day from "./pages/Day_by_Day/Day_by_Day";
import { plan } from "./Data";
import Search from "./pages/Search/Search";
import DestinationDescription from "./pages/DestinationDescription/DestinationDescription";

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
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
