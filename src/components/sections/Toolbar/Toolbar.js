import React from "react";
import { Link } from "react-router-dom";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// images & icons
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
import {
  faFeatherAlt,
  faHome,
  faUser,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
// style
import "./Toolbar.scss";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Link to="/about">
        <HowlerIcon fill="#1da1f2" className="howler-icon" title="about" />
      </Link>
      <div className="buttons">
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
        <Link to="signout" title="log out" className="link">
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
        <Link to="/howlinput" title="new howl" className="link">
          <label htmlFor="addHowl">Add Howl</label>
          <FontAwesomeIcon
            id="addHowl"
            icon={faFeatherAlt}
            className="icon"
            fixedWidth
          />
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
