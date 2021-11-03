import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import Avatar from "../Avatar/Avatar";
import ViewProfile from "../ViewProfile/ViewProfile";

const Comment = ({ comment }) => {
  const [poster, setPoster] = useState({});
  const [users, setUsers] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const getUsers = useSelector((state) => state.firestore.ordered.users);

  useEffect(() => {
    users
      ? setPoster(users.find((doc) => doc.uid === comment.uid))
      : setUsers(getUsers);
  }, [users, setUsers, getUsers, setPoster, comment.uid]);

  return (
    <div className="comment">
      <button onClick={() => setShowProfile(true)} className="avatar-button">
        <Avatar photoURL={poster.photoURL} displayName={poster.displayName} />
      </button>
      <span>{poster && `${poster.displayName} - ${comment.text}`}</span>
      {showProfile && (
        <ViewProfile
          user={poster}
          close={() => setShowProfile(false)}
          update={false}
        />
      )}
    </div>
  );
};

export default Comment;
