import React from "react";

const CommentInput = ({
  submitComment,
  docId,
  toggleCommenting,
  commenting,
  handleChange,
  newComment,
}) => {
  return (
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
          <button onClick={() => toggleCommenting(!commenting)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
