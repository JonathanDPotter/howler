import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
// images
import signupBack from "../../../images/signupBack.png";
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
// styles
import "./auth.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebase();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        history.push("/");
      })
      .catch((error) => {
        window.alert(error.message);
      });
    console.log("submit");
  };

  return (
    <div className="auth-page">
      <div className="image-container">
        <HowlerIcon fill="#fff" className="img-icon" />

        <img
          className="signup-image"
          src={signupBack}
          alt="graffiti background"
        />
      </div>
      <section className="signin-form">
        <h1 className="page-name">Happening now</h1>
        <h2 className="sub-title">Sign in to Howler</h2>
        <form action="submit" className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail: </label>
          <input
            id="email"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <input type="submit" value="submit" />
        </form>
        <p className="sign-up">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
