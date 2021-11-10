import React from "react";
// components
import Sidebar from "../../sections/Sidebar/Sidebar";
import HowlInput from "../../sections/HowlInput/HowlInput";
import Timeline from "../../sections/Timeline/Timeline";
import MobileHeader from "../../sections/MobileHeader/MobileHeader";
// styles
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="middle-container">
        <HowlInput />
        <MobileHeader />
        <Timeline />
      </div>
      <div className="right-empty"></div>
    </div>
  );
};

export default Dashboard;
