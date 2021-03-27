import React, { useState, useEffect } from "react";
import { db } from '../../firebase';
import './ProfileSnippet.css'

function ProfileSnippet(user) {
  const [displayName, setDisplayName] = useState()
  const [pfpUrl, setPfpUrl] = useState()
  useEffect(async () => {
    try {
      // Grab user data to get updated username and pfp
      const userRef = db.collection('users').doc(user.user.uid)
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

  return (
    <div className="profile-snippet-container">
      <h1>Profile Snippet</h1>
      {user.user ? <img src={user.user.photoUrl} alt='Profile Pic Loading' /> : null}
      {user.user ? <a>{user.user.displayName}</a> : null}
      <h1>Placeholder Headline</h1>
      {console.log(user.user)}
    </div>
  );
}

export default ProfileSnippet;