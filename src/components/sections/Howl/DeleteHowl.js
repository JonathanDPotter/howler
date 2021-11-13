import React from "react";
import { firestore } from "../../../firebase-store";

const DeleteHowl = ({ close, docId }) => {
  const deleteHowl = () => {
    firestore
      .collection("howls")
      .doc(docId)
      .delete()
      .then(() => {
        close();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    value === "No" ? close() : deleteHowl();
  };

  return (
    <div className="delete-modal">
      <form className="dlete-form">
        <h1>Do you really want to delete this Howl?</h1>
        <div className="buttons">
          <input type="button" value="Yes" onClick={handleSubmit} />
          <input type="button" value="No" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default DeleteHowl;
