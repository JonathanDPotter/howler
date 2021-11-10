import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// components
import Avatar from "../Avatar/Avatar";
// images
import stars from "../../../images/stars.png";
// styles
import "./MobileHeader.scss";

const MobileHeader = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
  }, [users, auth]);

  return (
    <header className="mobile-header">
      <Avatar
        photoURL={currentUser ? currentUser.photoURL : ""}
        displayName={currentUser ? currentUser.name : ""}
        className="avatar"
      />
      <strong>Latest Tweets</strong>
      <img src={stars} alt="stars" title="always latest" className="stars" />
    </header>
  );
};

export default MobileHeader;
