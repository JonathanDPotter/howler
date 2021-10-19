import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import { firestore } from "../../../firebase-store";
import "./auth.scss";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const firebase = useFirebase();
  const history = useHistory();

  const createNewUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid, photoURL } = userCredential.user;
        userCredential.user.updateProfile({ displayName }).then(
          firestore.collection("users").add({
            displayName,
            email,
            uid,
            photoURL,
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, displayName);
    if (password === passwordConfirm) {
      createNewUser();
      resetState();
    } else {
      window.alert("Passwords must match!");
      setPassword("");
      setPasswordConfirm("");
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
        <label htmlFor="password-2">Repeat Password: </label>
        <input
          id="password-2"
          type="password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          value={passwordConfirm}
          required
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SignUp;
