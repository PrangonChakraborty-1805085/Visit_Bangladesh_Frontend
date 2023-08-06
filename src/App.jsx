// import React from 'react';
import HeroForm from "./components/Home/HeroForm";
// import TravelPlan from "./components/TravelPlan/TravelPlan";
import TravelPlanUpdated from "./components/Home/TravelPlanUpdated/TravelPlanUpdated";
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// const plan = [
//   {
//     type: "cluster",
//     value: [
//       {
//         name: "Hatirjheel Lake",
//         time: 2,
//         rating: 2,
//       },
//       {
//         name: "Shangsad Bhaban",
//         time: 2,
//         rating: 2,
//       },
//       {
//         name: "Siddheshwari Kali Mandir",
//         time: 3,
//         rating: 3,
//       },
//       {
//         name: "Ahsan Manzil",
//         time: 4,
//         rating: 4,
//       },
//       {
//         name: "Lalbag Fort",
//         time: 3,
//         rating: 4,
//       },
//       {
//         name: "Bangladesh Liberation War Museum",
//         time: 3,
//         rating: 4,
//       },
//       {
//         name: "Bangladesh National Museum",
//         time: 3,
//         rating: 3,
//       },
//       {
//         name: "Dhaka Zoo",
//         time: 4,
//         rating: 2,
//       },
//     ],
//   },
//   {
//     type: "depart",
//     start: "Dhaka",
//     end: "Chittagong",
//     time: 241.52,
//   },
//   {
//     type: "cluster",
//     value: [
//       {
//         name: "Patenga Beach",
//         time: 3,
//         rating: 2,
//       },
//       {
//         name: "Chittagong Ethnological Museum",
//         time: 3,
//         rating: 3,
//       },
//       {
//         name: "Batali Hill",
//         time: 4,
//         rating: 4,
//       },
//       {
//         name: "Chittagong Commonwealth War Cemetery",
//         time: 3,
//         rating: 3,
//       },
//       {
//         name: "Chittagong War Cemetery",
//         time: 2,
//         rating: 3,
//       },
//       {
//         name: "Foy's Lake",
//         time: 2,
//         rating: 4,
//       },
//       {
//         name: "Chittagong Zoo",
//         time: 4,
//         rating: 3,
//       },
//     ],
//   },
//   {
//     type: "depart",
//     start: "Chittagong",
//     end: "Sylhet",
//     time: 366.494,
//   },
//   {
//     type: "cluster",
//     value: [
//       {
//         name: "Lalakhal",
//         time: 3,
//         rating: 4,
//       },
//       {
//         name: "Jaflong",
//         time: 4,
//         rating: 2,
//       },
//       {
//         name: "Ratargul Swamp Forest",
//         time: 6,
//         rating: 2,
//       },
//       {
//         name: "Bisnakandi",
//         time: 5,
//         rating: 4,
//       },
//       {
//         name: "Bholaganj Sada Pathor",
//         time: 2,
//         rating: 3,
//       },
//       {
//         name: "Madhabkunda Waterfall",
//         time: 2,
//         rating: 3,
//       },
//     ],
//   },
//   {
//     type: "depart",
//     start: "Sylhet",
//     end: "Dhaka",
//     time: 248.922,
//   },
// ];
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HeroForm />} />
      <Route path="day_by_day" element={<TravelPlanUpdated  />} />
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
