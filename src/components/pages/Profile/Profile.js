import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore, storage } from "../../../firebase-store";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import Avatar from "../../sections/Avatar/Avatar";

const Profile = () => {
  useFirestoreConnect([{ collection: "users" }]);

  const [inputImg, setInputImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    const updateState = () => {
      const { name, bio, photoURL } = currentUser;
      setPhotoURL(photoURL);
      setName(name);
      setBio(bio);
    };
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
    // add existing profile to state
    currentUser && updateState();
  }, [users, currentUser, setCurrentUser, auth.uid]);

  const onSubmit = (event) => {
    event.preventDefault();

    const update = () => {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .update({ name, bio, photoURL });
    };

    const getURLAndUpdate = () => {
      const ref = storage.ref();
      const name = inputImg.name;
      const metadata = { contentType: inputImg.type };
      const task = ref.child(name).put(inputImg, metadata);

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          setPhotoURL(url);
        })
        .then(() => update());
    };

    inputImg ? getURLAndUpdate() : update();
  };

  return (
    <div className="profile-page">
      <Avatar
        photoURL={currentUser ? currentUser.photoURL : ""}
        displayName={currentUser ? currentUser.displayName : ""}
      />
      <h1 className="user-name">{currentUser && currentUser.displayName}</h1>
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
