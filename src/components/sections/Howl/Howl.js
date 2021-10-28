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

const Howl = ({ howl }) => {
  useFirestoreConnect([{ collection: "users" }]);

  const [commenting, toggleCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const { docId, userId, text, likes, comments, time, image } = howl;

  const getUsers = useSelector((state) => state.firestore.ordered.users);

  useEffect(() => {
    users
      ? setUser(users.find((doc) => doc.uid === userId))
      : setUsers(getUsers);
  }, [users, user, userId, getUsers]);

  const handleLike = () => {
    const index = likes.indexOf(user.id);
    let newLikes;

    index !== 0
      ? likes.includes(user.id)
        ? (newLikes = { likes: [likes.splice(index, 1)] })
        : (newLikes = { likes: [...likes, user.id] })
      : (newLikes = { likes: [] });

    firestore.collection("howls").doc(docId).update(newLikes);
  };

  const handleChange = (event) => {
    setNewComment(event.currentTarget.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const { id } = event.currentTarget;

    console.log(id);

    const resetComment = () => {
      toggleCommenting(!commenting);
      setNewComment("");
    };

    firestore
      .collection("howls")
      .doc(id)
      .update({ comments: [...comments, newComment] })
      .then(() => resetComment());
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
          <div className="buttons">
            <button className="comment-button">
              <FontAwesomeIcon
                icon={faComment}
                className="image-icon"
                onClick={() => toggleCommenting(!commenting)}
              />
            </button>
            <button className="like-button" onClick={handleLike}>
              <FontAwesomeIcon
                icon={faStar}
                className={
                  user && likes.includes(user.id)
                    ? "image-icon liked"
                    : "image-icon"
                }
              />
            </button>
            <p>{likes.length > 0 && likes.length}</p>
          </div>
        </div>
        {commenting && (
          <div className="comment-form">
            <form action="submit" onSubmit={submitComment} id={docId}>
              <input
                type="text"
                name="comment-input"
                className="comment-input"
                maxLength={128}
                onChange={handleChange}
                value={newComment}
                placeholder="Enter comment"
              />
              <div className="buttons">
                <button type="submit">Submit</button>
                <button onClick={() => toggleCommenting(!commenting)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
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
