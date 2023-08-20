import React from "react";
import CreatePlanBody from "./CreatePlanBody";
import "./createPlan.css";
import Header_other from "../../components/Headers/Header_other";

export default function CreatePlan() {
  return (
    <div className="createPlanBody">
      <Header_other />
      <CreatePlanBody />
    </div>
  );
}
