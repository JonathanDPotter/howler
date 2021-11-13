import React from "react";
import { useHistory } from "react-router";
// styles
import "./legal.scss";

const Cookie = () => {
  const history = useHistory();

  return (
    <div className="legal-page">
      <p className="cookie">Please send me cookies.</p>
      <button className="back" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default Cookie;
