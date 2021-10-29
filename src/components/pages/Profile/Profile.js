import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import Avatar from "../../sections/Avatar/Avatar";
import { useHistory } from "react-router";

const Profile = () => {
  const [inputImg, setInputImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const history = useHistory();

  const currentUser = useSelector((state) => state.firebase.auth);

  return (
    <div className="profile-page">
      <Avatar
        photoURL={currentUser.photoURL}
        displayName={currentUser.displayName}
      />
      <h1 className="user-name">{currentUser.displayName}</h1>
      <form action="submit" className="profile-form">
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
          onChange={(event) => setInputImg(event.target.files[0])}
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
      </form>
    </div>
  );
};

export default Profile;
