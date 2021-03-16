import React, { useState } from "react";
// import "./CommentInput.css";
import { db } from "../../firebase";
import firebase from '../../firebase.js';
import Moment from 'moment';

function CommentInput({ comments, id, user, pfp }) {
  const [comment, setComment] = useState("");
  const [commentMap, setcommentMap] = useState(comments ? comments : []);

  const addComment = () => {
    // Add a new document in collection "cities"

    commentMap.push({
      comment: comment,
      username: user,
      time: Moment(Date.now()).format('ll'),
      // pfp: pfp
    });

    firebase.database().ref(`/items/${id}`)
      .update({
        comments: commentMap,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setComment("");
  };

  return (
    <div>
      <textarea
        rows="1"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment.."
      ></textarea>

      <button
        onClick={addComment}
        style={{
          color: comment ? "gray" : "lightgrey",
          fontWeight: comment ? "600" : "500",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CommentInput;