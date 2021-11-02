import React, { useState } from "react";
// components
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const ViewProfile = ({ close, user, update }) => {
  const [updating, toggleUpdating] = useState(false);

  return (
    <div className="profile-view">
      <div className="image-container">
        <img src={user.photoURL} alt={user.name} />
      </div>
      <div className="name-bio-container">
        <h1 className="user-name">
          {user.name}@{user.handle}
        </h1>
        <p className="bio">{user.bio}</p>
      </div>
      <div className="buton-container">
        {update && (
          <button className="btn" onClick={() => toggleUpdating(!updating)}>
            Update Profile
          </button>
        )}
        <button className="btn" onClick={close}>
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
