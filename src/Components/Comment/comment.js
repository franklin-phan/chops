import React from "react";
import pfp from './pfp.png'
// import "./Comment.css";

function Comment({ data }) {
  const {id, comment} = data
  const {body, postedBy, timestamp} = comment
  console.log(comment)
  function convertTimestamp(timestamp) {
    if (!timestamp) {
      return 'test'
    }
    let date = timestamp.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
  
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }
  return (
    <div className="comment">
      <img src={pfp} width="30px" height="30px"/>
      <p>
        <strong>{postedBy}</strong> {body}
      </p>
      <time>{convertTimestamp(timestamp)}</time>
    </div>
  );
}

export default Comment;