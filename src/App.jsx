// import React from 'react';
import HeroForm from "./components/Home/HeroForm";
import TravelPlan from "./components/TravelPlan/TravelPlan";
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const plan = [
  [
    {
      date: "2023-08-10",
      name: "Activity 1",
      rating: 4,
      description: "Description for Activity 1",
    },
    {
      date: "2023-08-10",
      name: "Activity 2",
      rating: 5,
    },
  ],
  [
    {
      date: "2023-08-11",
      name: "Activity 3",
      rating: 3,
      description: "Description for Activity 3",
    },
  ],
];
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HeroForm />} />
      <Route path="day_by_day" element={<TravelPlan plan={plan} />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
