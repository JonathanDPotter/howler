import React from "react";
import { Link } from "react-router-dom";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// images & icons
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
import { faHome, faUser, faUserSlash } from "@fortawesome/free-solid-svg-icons";
// style
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/about">
        <HowlerIcon fill="#1da1f2" className="howler-icon" title="about" />
      </Link>
      <nav className="nav">
        <Link to="/" title="home" className="link">
          <label htmlFor="home" className="link-label">
            Home
          </label>
          <FontAwesomeIcon
            id="home"
            icon={faHome}
            className="icon"
            fixedWidth
          />
        </Link>
        <Link to="profile" title="profile" className="link">
          <label htmlFor="profile" className="link-label">
            Profile
          </label>
          <FontAwesomeIcon
            id="profile"
            icon={faUser}
            className="icon"
            fixedWidth
          />
        </Link>
        <Link to="/signout" title="signout" className="link">
          <label htmlFor="signout" className="link-label">
            Sign Out
          </label>
          <FontAwesomeIcon
            id="signout"
            icon={faUserSlash}
            className="icon"
            fixedWidth
          />
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
