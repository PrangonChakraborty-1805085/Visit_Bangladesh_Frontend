import React from "react";
import CreatePlanBody from "./CreatePlanBody";
import "./createPlan.css";
import Header_other from "../../components/Headers/Header_other";
import Header_home from "../../components/Headers/Header_home";

export default function CreatePlan() {
  return (
    <div className="bg-gray-100 createPlanBody">
      <Header_home />
      <CreatePlanBody />
    </div>
  );
}
