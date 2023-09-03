import React from "react";
// import Header from "../../components/Header";
import HomeBody from "./HomeBody";
import "./home.css";
import Header_home from "../../components/Headers/Header_home";
import { useDispatch } from "react-redux";
import { setPlan } from "../../redux/features/plan-slice";

export default function Home() {
  //dispatch the plan to null
  const dispatch = useDispatch();
  dispatch(setPlan(null));
  return (
    <div className="home">
      <Header_home />
      <HomeBody />
    </div>
  );
}
