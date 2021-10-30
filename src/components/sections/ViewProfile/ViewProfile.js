import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
// components
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const ViewProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [updating, toggleUpdating] = useState(false);

  const history = useHistory();

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
  }, [users, currentUser, setCurrentUser, auth]);

  return (
    <div className="profile-view">
      <div className="image-container">
        <img
          src={currentUser && currentUser.photoURL}
          alt={currentUser && currentUser.name}
        />
      </div>
      <div className="name-bio-container">
        <h1 className="user-name">
          {currentUser && currentUser.name}@{currentUser && currentUser.handle}
        </h1>
        <p className="bio">{currentUser && currentUser.bio}</p>
      </div>
      <div className="buton-container">
        <button className="btn" onClick={() => toggleUpdating(!updating)}>
          Update Profile
        </button>
        <button className="btn" onClick={() => history.goBack()}>
          Close
        </button>
      </div>
      <div className="update-container">
        {updating && (
          <UpdateProfile toggleUpdating={() => toggleUpdating(!updating)} />
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
