import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import { useFirestoreConnect } from "react-redux-firebase";
//components
import Avatar from "../Avatar/Avatar";
import { storage, firestore } from "../../../firebase-store";
import { useSelector } from "react-redux";
//styles
import "./HowlInput.scss";
//icons
import { faImage } from "@fortawesome/free-solid-svg-icons";

const HowlInput = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const [inputText, setInputText] = useState("");
  const [inputImg, setInputImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
  }, [users, auth]);

  let imgRef = "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const addHowl = () => {
      const docId = uuid();

      firestore.collection("howls").doc(docId).set({
        userId: auth.uid,
        text: inputText,
        image: imgRef,
        time: Date.now(),
        comments: [],
        likes: [],
        docId: docId,
      });
      setInputText("");
      setInputImg(null);
    };

    const getURLAndAddHowl = () => {
      const ref = storage.ref();
      const name = inputImg.name;
      const metadata = { contentType: inputImg.type };
      const task = ref.child(name).put(inputImg, metadata);

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          imgRef = url;
        })
        .then(() => addHowl());
    };

    inputImg ? getURLAndAddHowl() : addHowl();
  };

  const handleChange = (event) => {
    setInputText(event.currentTarget.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const loaded = () => {
    return (
      <div className="howl-box">
        <form className="howl-form" onSubmit={handleSubmit}>
          <div className="avatar-howl-container">
            {currentUser && currentUser.displayName}
            <Avatar
              photoURL={currentUser ? currentUser.photoURL : ""}
              displayName={currentUser ? currentUser.name : ""}
              className="avatar"
            />
            <textarea
              id="howl-input"
              className="howl-input"
              placeholder="What's Happening?"
              maxLength={281}
              value={inputText}
              cols={60}
              onChange={handleChange}
            ></textarea>
          </div>
          <hr />
          {inputImg && (
            <img
              src={URL.createObjectURL(inputImg)}
              alt="user input"
              className="img"
            />
          )}
          <div className="buttons">
            <label htmlFor="image-input">
              <FontAwesomeIcon icon={faImage} className="image-icon" />
            </label>
            <input
              type="file"
              id="image-input"
              accept="image/jpg image/png"
              onChange={(event) => setInputImg(event.target.files[0])}
            />
            <label htmlFor="howl-btn" className="btn-label">
              {inputText.length > 0 && (
                <p className="chars-remaining">{281 - inputText.length}</p>
              )}
              <button id="howl-btn" className="howl-btn">
                Howl
              </button>
            </label>
          </div>
        </form>
      </div>
    );
  };

  const loading = () => {
    return <div className="loading">Loading...</div>;
  };

  if (auth) {
    return loaded();
  } else {
    return loading();
  }
};

export default HowlInput;
