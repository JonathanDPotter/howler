import React from "react";
// components
import Sidebar from "../../sections/Sidebar";
import HowlInput from "../../sections/HowlInput";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="middle-container">
        <HowlInput />
      </div>
      <div className="right-empty"></div>
    </div>
  );
};

export default Dashboard;
