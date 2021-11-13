import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import { firestore } from "../../../firebase-store";
// images
import signupBack from "../../../images/signupBack.png";
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
// styles
import "./auth.scss";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [handle, setHandle] = useState("");

  const { users } = useSelector((state) => state.firestore.ordered);

  const firebase = useFirebase();
  const history = useHistory();

  const createNewUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid, photoURL } = userCredential.user;
        userCredential.user.updateProfile({ displayName }).then(
          firestore.collection("users").doc(uid).set({
            displayName,
            email,
            uid,
            photoURL,
            handle,
          })
        );
        history.push("/");
      })
      .catch((error) => {
        window.alert(`${error.code}, ${error.message}`);
      });
  };

  const resetState = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setHandle("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!users.find((user) => user.handle === handle)) {
      if (password === passwordConfirm) {
        createNewUser();
        resetState();
      } else {
        window.alert("Passwords must match!");
        setPassword("");
        setPasswordConfirm("");
      }
    } else {
      window.alert("Handle must be unique!");
      setHandle("");
    }
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
      <section className="signup-form">
        <HowlerIcon fill="#1D9BF0" className="form-icon" />
        <h1 className="page-name">Happening now</h1>
        <h2 className="sub-title">Join Howler today</h2>
        <form action="submit" className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="display-name">Display Name: </label>
          <input
            id="display-name"
            type="text"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
            required
          />
          <label htmlFor="handle">Handle: </label>
          <input
            type="text"
            id="handle"
            onChange={(event) => setHandle(event.target.value.toLowerCase())}
            value={handle}
            required
          />
          <label htmlFor="email">E-mail: </label>
          <input
            id="email"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            autoComplete="e-mail"
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            autoComplete="new-password"
            required
          />
          <label htmlFor="password-2">Repeat Password: </label>
          <input
            id="password-2"
            type="password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
            value={passwordConfirm}
            autoComplete="new-password"
            required
          />
          <input type="submit" value="submit" />
        </form>
        <div className="bottom-text">
          <p className="legal">
            By signing up, you agree to the{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>, including{" "}
            <a href="/cookie">Cookie Use</a>.
          </p>
          <br />
          <p className="sign-in">
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
