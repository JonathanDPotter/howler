import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { firestore } from "../../../firebase-store";
// styles
import "./Howl.scss";
// components
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// functions
import timeCalc from "./timeCalc";
// icons
import { faStar, faComment } from "@fortawesome/free-solid-svg-icons";

const Howl = ({ docId, userId, text, image, time, comments, likes }) => {
  useFirestoreConnect([{ collection: "users" }]);

  const [commenting, toggleCommenting] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const getUsers = useSelector((state) => state.firestore.ordered.users);

  useEffect(() => {
    if (!users) {
      setUsers(getUsers);
    } else {
      setUser(users.find((doc) => doc.uid === userId));
    }
  }, [users, user, userId, getUsers]);

  const handleLike = () => {
    const newLikesTotal = likes + 1;
    firestore.collection("howls").doc(docId).update({ likes: newLikesTotal });
  };

  const handleComment = () => {
    toggleCommenting(!commenting);
  };

  const handleChange = (event) => {
    setNewComment(event.currentTarget.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const resetComment = () => {
      toggleCommenting(!commenting);
      setNewComment(null);
    };

    if (comments) {
      firestore
        .collection("howls")
        .doc(docId)
        .update({
          comments: [...comments, newComment],
        })
        .then(() => resetComment());
    } else {
      firestore
        .collection("howls")
        .doc(docId)
        .update({ comments: [newComment] })
        .then(() => resetComment());
    }
  };

  return (
    <div className="howl">
      <div className="avatar-container">
        <Avatar
          photoURL={user ? user.photoURL : ""}
          displayName={user ? user.displayName : ""}
        />
      </div>
      <div className="name-text-img-container">
        <p className="userName">
          {user && user.displayName} - {timeCalc(Date.now(), time)}
        </p>
        <p className="howl-text">{text}</p>
        <div className="img-container">
          {image ? (
            <img src={image} alt="user uploaded" className="img" />
          ) : null}
        </div>
        <div className="buttons-container">
          <form action="" className="buttons">
            <label htmlFor="comment-button">
              <FontAwesomeIcon icon={faComment} className="image-icon" />
            </label>
            <input
              id="comment-button"
              type="checkbox"
              onClick={handleComment}
              style={{ display: "none" }}
            />
            <label htmlFor="like-button">
              <FontAwesomeIcon icon={faStar} className="image-icon" />
            </label>
            <input
              id="like-button"
              type="checkbox"
              onClick={handleLike}
              style={{ display: "none" }}
            />
            <label htmlFor="like-button">{likes > 0 && likes}</label>
          </form>
        </div>
        {commenting ? (
          <div className="comment-form">
            <form action="submit" onSubmit={submitComment}>
              <input
                type="text"
                name="comment-input"
                className="comment-input"
                maxLength={128}
                onChange={handleChange}
                value={newComment ? newComment : ""}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
        <div className="comments">
          {comments
            ? comments.map((comment, index) => {
                return (
                  <p key={index} className="comment">
                    {comment}
                  </p>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Howl;
