import React from "react";
import { useHistory } from "react-router";
// styles
import "./legal.scss";

const Privacy = () => {
  const history = useHistory();

  return (
    <div className="legal-page">
      <p className="privacy">
        I can see your username, email and password. I won't do anything bad
        with the information, but you shouldn't use a password that you use for
        other sites.
      </p>
      <p className="privacy">
        Go ahead and make a simple password like "password". It won't really
        matter, because no one will be able to use your Howler login to steal
        your identity.
      </p>
      <p className="privacy">
        Everything you howl is public and can be seen by everyone else who uses
        Howler, but that won't be very many people.
      </p>
      <button className="back" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default Privacy;
