import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import { useFirestoreConnect } from "react-redux-firebase";
import { storage, firestore } from "../../../firebase-store";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
//components
import Avatar from "../Avatar/Avatar";
import Loading from "../../utilities/Loading";
//styles
import "./HowlInput.scss";
//icons
import { faImage } from "@fortawesome/free-solid-svg-icons";

const HowlInput = ({ cancel, show }) => {
  useFirestoreConnect([{ collection: "users" }]);
  const history = useHistory();

  const [inputText, setInputText] = useState("");
  const [inputImg, setInputImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const imgRef = useRef("");
  const canvas = useRef(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
  }, [users, auth]);

  useEffect(() => {
    if (inputImg && canvas) {
      const image = new Image();
      image.src = URL.createObjectURL(inputImg);
      const ctx = canvas.current.getContext("2d");
      const height = 300;
      image.onload = () => {
        const ratio = image.width / image.height;
        canvas.current.height = height;
        canvas.current.width = height * ratio;
        ctx.drawImage(image, 0, 0, height * ratio, height);
      };
    }
  }, [inputImg, canvas]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const addHowl = () => {
      const docId = uuid();

      firestore.collection("howls").doc(docId).set({
        userId: auth.uid,
        text: inputText,
        image: imgRef.current,
        time: Date.now(),
        comments: [],
        likes: [],
        docId: docId,
      });
      setInputText("");
      setInputImg(null);
      cancel && history.goBack();
    };

    const getURLAndAddHowl = () => {
      const ref = storage.ref();
      const name = inputImg.name;
      const metadata = { contentType: inputImg.type };
      const task = ref.child(name).put(inputImg, metadata);

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          imgRef.current = url;
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
      <div className="howl-box" style={show && { display: "block" }}>
        <form className="howl-form" onSubmit={handleSubmit}>
          <div className="avatar-howl-container">
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
          {inputImg && <canvas ref={canvas} />}
          <div className="buttons">
            <label htmlFor="image-input" title="image input">
              <FontAwesomeIcon icon={faImage} className="image-icon" />
            </label>
            <input
              type="file"
              id="image-input"
              accept="image/jpg image/png"
              onChange={async (event) => {
                const file = event.target.files[0];
                setInputImg(file);
              }}
            />
            {cancel && (
              <button
                id="cancel"
                className="cancel-btn"
                type="reset"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
            )}
            <button id="howl" className="howl-btn" type="submit">
              Howl
            </button>
            <label htmlFor="howl" className="btn-label">
              <p
                style={inputText.length === 0 ? { opacity: 0 } : { opacity: 1 }}
                className="chars-remaining"
              >
                {281 - inputText.length}
              </p>
            </label>
          </div>
        </form>
      </div>
    );
  };

  if (auth) {
    return loaded();
  } else {
    return <Loading />;
  }
};

export default HowlInput;
