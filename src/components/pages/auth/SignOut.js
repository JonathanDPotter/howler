import React from "react";
import { useHistory } from "react-router";
import { useFirebase } from "react-redux-firebase";
import "./auth.scss";

const SignOut = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();

    const { value } = event.target;

    switch (value) {
      case "Sign Out":
        firebase
          .auth()
          .signOut()
          .then(() => {
            history.push("/signin");
          })
          .catch((error) => {
            window.alert(error.message);
          });
        break;
      case "Cancel":
        history.goBack();
        break;
      default:
        console.log("Something went wrong.");
        break;
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-name">Sign Out</h1>
      <form>
        <input type="button" value="Sign Out" onClick={handleClick} />
        <br />
        <input type="button" value="Cancel" onClick={handleClick} />
      </form>
    </div>
  );
};

export default SignOut;
