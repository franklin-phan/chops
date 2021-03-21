import React, { useState } from "react";
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
    <div className="commentInputContainer">
      <textarea
        rows="1"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add a comment.."
        className="commentInput"
      ></textarea>

      <button
        onClick={handleSubmit}
        style={{
          margin: "0",
          width: "10%"
        }}
        className="post-comment-button"
      >
        Post
      </button>
      </div> : null}
    </div>
  );
}

export default CommentInput;