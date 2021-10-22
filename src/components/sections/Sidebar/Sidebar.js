import React from "react";
import { Link } from "react-router-dom";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// images & icons
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
// style
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/about">
        <HowlerIcon fill="#1da1f2" className="howler-icon" title="about" />
      </Link>
      <nav className="nav">
        <Link to="/" title="home">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link to="profile" title="profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
