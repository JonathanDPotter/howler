import React, { useEffect, useState } from "react";
// components
import Toolbar from "../../sections/Toolbar/Toolbar";
import HowlInput from "../../sections/HowlInput/HowlInput";
import Timeline from "../../sections/Timeline/Timeline";
import MobileHeader from "../../sections/MobileHeader/MobileHeader";
// styles
import "./Dashboard.scss";

const Dashboard = () => {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, [width, setWidth]);

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Toolbar />
      </div>
      <div className="middle-container">
        {width && width > 500 && <HowlInput />}
        <MobileHeader />
        <Timeline />
      </div>
      <div className="right-empty"></div>
    </div>
  );
};

export default Dashboard;
