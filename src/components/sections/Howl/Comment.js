import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";

const Comment = ({ comment }) => {
  const [poster, setPoster] = useState({});
  const [users, setUsers] = useState(null);

  const getUsers = useSelector((state) => state.firestore.ordered.users);

  useEffect(() => {
    users
      ? setPoster(users.find((doc) => doc.uid === comment.uid))
      : setUsers(getUsers);
  }, [users, setUsers, getUsers, setPoster, comment.uid]);

  return (
    <div className="comment">
      <Avatar photoURL={poster.photoURL} displayName={poster.displayName} />
      <span>{poster && `${poster.displayName} - ${comment.text}`}</span>
    </div>
  );
};

export default Comment;
