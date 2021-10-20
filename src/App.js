import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import SignUp from "./components/pages/auth/SignUp";
import SignIn from "./components/pages/auth/SignIn";
import SignOut from "./components/pages/auth/SignOut";
import Profile from "./components/pages/Profile";
import Dashboard from "./components/pages/Dashboard/Dashbaord";
// style
import "./App.scss";

const App = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const auth = useSelector((state) => state.firebase.auth);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {auth ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signout">
            <SignOut />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
