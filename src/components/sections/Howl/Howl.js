import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { firestore } from "../../../firebase-store";
// components
import Avatar from "../Avatar/Avatar";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// functions
import timeCalc from "./timeCalc";
// styles
import "./Howl.scss";
// icons
import { faStar, faComment } from "@fortawesome/free-solid-svg-icons";

const Howl = ({ howl }) => {
  useFirestoreConnect([{ collection: "users" }]);

  const [commenting, toggleCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState(null);
  const [op, setOp] = useState(null);

  const { docId, userId, text, likes, comments, time, image } = howl;

  const getUsers = useSelector((state) => state.firestore.ordered.users);

  const currentUser = useSelector((state) => state.firebase.auth);

  // establish user that posted this howl (op = original poster)
  useEffect(() => {
    users ? setOp(users.find((doc) => doc.uid === userId)) : setUsers(getUsers);
  }, [users, op, userId, getUsers]);

  const handleLike = () => {
    const index = likes.indexOf(currentUser.uid);
    let newLikes = [...likes];

    if (index > 0) {
      newLikes.splice(index, 1);
    } else if (index === 0) {
      if (likes.length > 1) {
        newLikes.splice(index, 1);
      } else {
        newLikes = [];
      }
    } else {
      newLikes = [...newLikes, currentUser.uid];
    }

    firestore.collection("howls").doc(docId).update({ likes: newLikes });
  };

  const handleChange = (event) => {
    setNewComment(event.currentTarget.value);
  };

  const submitComment = (event) => {
    event.preventDefault();

    const { id } = event.currentTarget;
    const { uid, photoURL } = currentUser;

    const resetComment = () => {
      toggleCommenting(!commenting);
      setNewComment("");
    };

    firestore
      .collection("howls")
      .doc(id)
      .update({
        comments: [
          ...comments,
          { uid: uid, photoURL: photoURL, text: newComment },
        ],
      })
      .then(() => resetComment());
  };

  return (
    <div className="howl">
      <div className="avatar-container">
        <Avatar
          photoURL={op ? op.photoURL : ""}
          displayName={op ? op.displayName : ""}
        />
      </div>
      <div className="name-text-img-container">
        <p className="userName">
          {op && op.displayName} - {timeCalc(Date.now(), time)}
        </p>
        <p className="howl-text">{text}</p>
        <div className="img-container">
          {image && <img src={image} alt="user uploaded" className="img" />}
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
                  currentUser && likes.includes(currentUser.uid)
                    ? "image-icon liked"
                    : "image-icon"
                }
              />
            </button>
            <p>{likes.length > 0 && likes.length}</p>
          </div>
        </div>
        {commenting && (
          <CommentInput
            submitComment={submitComment}
            docId={docId}
            toggleCommenting={toggleCommenting}
            commenting={commenting}
            handleChange={handleChange}
            newComment={newComment}
          />
        )}
        <div className="comments">
          {comments &&
            comments.map((comment, index) => {
              return <Comment key={`comment${index}`} comment={comment} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Howl;
