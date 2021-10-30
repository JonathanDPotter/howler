import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
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
    <div className="page-container">
      <h1 className="page-name">Sign In</h1>
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
        <input
          type="button"
          value="sign up"
          onClick={() => history.push("/signup")}
        />
      </form>
    </div>
  );
};

export default SignIn;
