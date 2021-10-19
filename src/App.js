import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import Loading from "./components/utilities/Loading";
import SignUp from "./components/pages/auth/SignUp";
import SignIn from "./components/pages/auth/SignIn";
import SignOut from "./components/pages/auth/SignOut";
import Profile from "./components/pages/Profile";
import "./App.scss";

const App = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const auth = useSelector((state) => state.firebase.auth);
  const { users } = useSelector((state) => state.firestore.ordered);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            current user: {auth.isLoaded ? auth.displayName : <Loading />}
            <br />
            <br />
            all users:
            <br />
            {users ? (
              users.map((user, i) => <p key={i}>{user.displayName}</p>)
            ) : (
              <Loading />
            )}
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
