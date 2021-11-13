import React from "react";
import { useHistory } from "react-router";
// styles
import "./legal.scss";

const Terms = () => {
  const history = useHistory();

  return (
    <div className="legal-page">
      <p className="terms">
        You have to be nice to me.
      </p>
      <button className="back" onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

export default Terms;
