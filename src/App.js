import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import SignUp from "./components/pages/auth/SignUp";
import SignIn from "./components/pages/auth/SignIn";
import SignOut from "./components/pages/auth/SignOut";
import Profile from "./components/pages/Profile/Profile";
import Dashboard from "./components/pages/Dashboard/Dashbaord";
import Loading from "./components/utilities/Loading";
import Landing from "./components/pages/Landing/Landing";
// style
import "./App.scss";

const App = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const auth = useSelector((state) => state.firebase.auth);

  const routes = (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
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
  );

  return <div className="App">{auth.isLoaded ? routes : <Loading />}</div>;
};

export default App;
