import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore, storage } from "../../../firebase-store";
import { useFirestoreConnect } from "react-redux-firebase";
// styles
import "./UpdateProfile.scss";

const Profile = ({ toggleUpdating }) => {
  useFirestoreConnect([{ collection: "users" }]);

  const [inputImg, setInputImg] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    const updateState = () => {
      const { displayName, bio } = currentUser;
      setDisplayName(displayName);
      setBio(bio);
      setInputImg(null);
    };
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
    // add existing profile to state
    currentUser && updateState();
  }, [users, currentUser, setCurrentUser, auth.uid]);

  const handleSubmit = (event) => {
    const update = (url = "") => {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .update(
          inputImg ? { displayName, bio, photoURL: url } : { displayName, bio }
        );
    };

    const getURLAndUpdate = () => {
      const ref = storage.ref();
      const name = inputImg.name;
      const metadata = { contentType: inputImg.type };
      const task = ref.child(name).put(inputImg, metadata);

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          update(url);
        });
    };

    inputImg ? getURLAndUpdate() : update();
    toggleUpdating();
  };

  return (
    <div className="modal-back">
      <div className="update-body">
        <form action="submit" className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Display Name</label>
          <input
            type="text"
            id="name"
            placeholder="enter a new name"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
          />
          <br />
          <label htmlFor="image-input">New Avatar Image</label>
          <input
            type="file"
            id="image-input"
            accept="image/jpg image/png"
            onChange={(event) => {
              setInputImg(event.target.files[0]);
            }}
          />
          {inputImg && (
            <img
              src={URL.createObjectURL(inputImg)}
              alt="user input"
              className="img"
            />
          )}
          <br />
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            cols="30"
            rows="5"
            max={120}
            onChange={(event) => setBio(event.target.value)}
            value={bio}
            placeholder="enter a short description of yourself"
          ></textarea>
          <button className="cancel" onClick={() => toggleUpdating(false)}>
            Cancel
          </button>
          <button type="submit" value="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
