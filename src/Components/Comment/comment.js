import React from "react";
import pfp from './pfp.png'
// import "./Comment.css";

function Comment({ username, comment, time }) {
  return (
    <div className="comment">
      <img src={pfp} width="30px" height="30px"/>
      <p>
        <strong>{username}</strong> {comment}
      </p>
      <time>{time}</time>
    </div>
  );
}

export default Comment;