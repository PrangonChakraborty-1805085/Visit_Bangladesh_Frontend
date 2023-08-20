import React from "react";
// import Header from "../../components/Header";
import HomeBody from "./HomeBody";
import "./home.css";
import Header_home from "../../components/Headers/Header_home";

export default function Home() {
  return (
    <div className="home">
      <Header_home/>
      <HomeBody />
    </div>
  );
}
