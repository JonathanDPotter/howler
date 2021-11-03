import React, { useState } from "react";
// components
import UpdateProfile from "../UpdateProfile/UpdateProfile";
// images
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
// styles
import "./ViewProfile.scss";

const ViewProfile = ({ close, user, update }) => {
  const [updating, toggleUpdating] = useState(false);

  return (
    <div className="profile-view">
      <div className="image-container">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.name} />
        ) : (
          <HowlerIcon fill="#1D9BF0" className="howler-icon" />
        )}
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
