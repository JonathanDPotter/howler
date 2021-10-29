import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../../firebase-store";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import Avatar from "../../sections/Avatar/Avatar";

const Profile = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const [inputImg, setInputImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const currentUser = useSelector((state) => state.firebase.auth);

  const onSubmit = (event) => {
    event.preventDefault();

    firestore
      .collection("users")
      .doc(currentUser.uid)
      .update({ name, bio, photoURL });
  };

  return (
    <div className="profile-page">
      <Avatar
        photoURL={currentUser.photoURL}
        displayName={currentUser.displayName}
      />
      <h1 className="user-name">{currentUser.displayName}</h1>
      <form action="submit" className="profile-form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="enter a new name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <br />
        <label htmlFor="image-input">Avatar Image</label>
        <input
          type="file"
          id="image-input"
          accept="image/jpg image/png"
          onChange={(event) => {
            setInputImg(event.target.files[0]);
            setPhotoURL(URL.createObjectURL(event.target.files[0]));
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
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Profile;
