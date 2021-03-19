import React, { useState } from "react";
// import "./CommentInput.css";
import { db } from "../../firebase";
import firebase from 'firebase';

function CommentInput({ itemID, userID, user }) {
  const [body, setBody] = useState("");
  // const [commentMap, setcommentMap] = useState(comments ? comments : []);
  console.log(user)
  async function handleSubmit(e) {
    e.preventDefault();
    const commentsRef = db.collection('posts').doc(itemID).collection("comments");

    const res = await commentsRef.add({
        body: body,
        postedBy: user,
        snaps: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    setBody('');    
  }

  return (
    <div>
      <textarea
        rows="1"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add a comment.."
      ></textarea>

      <button
        onClick={handleSubmit}
        style={{
          color: body ? "gray" : "lightgrey",
          fontWeight: body ? "600" : "500",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CommentInput;