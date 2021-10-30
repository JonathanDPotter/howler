import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import { firestore } from "../../../firebase-store";
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
    console.log(email, password, displayName, handle);
    if (!users.find((user) => user.handle === handle)) {
      console.log("worked");
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
    <div className="page-container">
      <h1 className="page-name">Sign Up</h1>
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
      {handle}
    </div>
  );
};

export default SignUp;
