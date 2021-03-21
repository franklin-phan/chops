import React, { useState } from "react";
// import "./CommentInput.css";
import { db } from "../../firebase";
import firebase from 'firebase';

function CommentInput({ itemID, user, isLoggedIn }) {
  const [body, setBody] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const commentsRef = db.collection('posts').doc(itemID).collection("comments");
      const {displayName} = user
      const res = await commentsRef.add({
          body: body,
          postedBy: displayName,
          snaps: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setBody(''); 
    } catch (error) {
      
    }
  }

  return (
    <div>
      {isLoggedIn ? 
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
      </div> : null}
    </div>
  );
}

export default CommentInput;