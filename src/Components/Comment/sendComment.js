import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import firebase from 'firebase';

function CommentInput({ itemID, user, isLoggedIn }) {
  const [body, setBody] = useState("");
  const [displayName, setDisplayName] = useState()
  const [pfpUrl, setPfpUrl] = useState()
  useEffect(async () => {
    try { 
      // Grab user data to get updated username and pfp
      const userRef = db.collection('users').doc(user.uid)
      const userRes = await userRef.get()
      if (!userRes.exists) { 
        console.log("error finding owner of comment")
      } else {
        setDisplayName(userRes.data().displayName) 
        setPfpUrl(userRes.data().pfpUrl)
      }
      console.log("ran once")
    } catch (error) {
      console.log(error)
    }
  }, [displayName, pfpUrl])
  async function handleSubmit(e) {
    e.preventDefault();
    try { 
      const commentsRef = db.collection('posts').doc(itemID).collection("comments");
      const {uid} = user
      const res = await commentsRef.add({
          body: body,
          postedBy: displayName,
          pfpUrl: pfpUrl,
          uid: uid,
          snaps: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setBody(''); 
    } catch (error) {
      console.log(error)
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