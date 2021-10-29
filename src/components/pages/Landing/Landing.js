import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
// components
import Loading from "../../utilities/Loading";

const Landing = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (error) console.log(error);

  return (
    <Route
      render={() =>
        loading ? (
          <Loading />
        ) : user ? (
          <Redirect to="/Dashboard" />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default Landing;
