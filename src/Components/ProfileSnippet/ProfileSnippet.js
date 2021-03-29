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
      <div className="profile-snippet-header">
        <div className="profile-snippet-image-wrapper">
          {user.user ? <img src={user.user.photoUrl} className="snippet-image" alt='Profile Pic Loading' /> : null}
        </div>
      </div>

      <div className="profile-snippet-body">
        <div>
          {user.user ? <a href={"/profile/" + user.user.uid} className="snippet-name">{user.user.displayName}</a> : null}
          <p className="snippet-headline">Placeholder Headline</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSnippet;