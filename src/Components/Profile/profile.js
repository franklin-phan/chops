import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { db } from '../../firebase';
import Post from '../Post/Post'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import EditProfile from './editProfile'

function Profile() {
  const user = useSelector(selectUser)

  const [uidInvalid, setUidInvalid] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [profileData, setProfileData] = useState()
  const [posts, setPosts] = useState([])

  const [bio, setBio] = useState()
  const [pronouns, setPronouns] = useState()
  const [displayName, setDisplayName] = useState()


  let { uid } = useParams()
  useEffect(async () => {
    const profileDataRef = db.collection("users").doc(uid)
    const doc = await profileDataRef.get();
    if (!doc.exists) {
      setUidInvalid(true)
      console.log('No such document!');
    } else {
      setProfileData(doc.data())
      console.log('Document data:', doc.data());
    }
    db.collection("posts").where("uid", "==", uid).get()
      .then(snap => {
        setPosts(snap.docs.map(doc => (
          {
            id: doc.id,
            data: doc.data(),
          }
        )))
        console.log(doc.data())
      });
    console.log(posts)

  }, [])
  function handleSubmit(e) {
    e.preventDefault();
    db.collection("users").doc(uid).update({
      bio: bio,
      pronouns: pronouns,
      displayName: displayName
    });
    setBio('');
    setPronouns('');
    setDisplayName('');
    setEditProfile(false);
  }
  function changeBio(e) {
    setBio(e.target.value)
  }
  function changePronouns(e) {
    setPronouns(e.target.value)
  }
  function changeDisplayName(e) {
    setDisplayName(e.target.value)
  }
  return (
    <div className="profile">
      {uidInvalid ? <h1>Profile page does not exist!</h1> :
        <div>
          {editProfile ? <EditProfile
            bio={bio}
            pronouns={pronouns}
            displayName={displayName}
            changeBio={changeBio}
            changePronouns={changePronouns}
            changeDisplayName={changeDisplayName}
            handleSubmit={handleSubmit}
          /> :
            <div>
              {profileData ?
                <div className="profile-container">
                  <div className="profile-banner">
                    <img className="profile-image" src={profileData.pfpUrl} />
                    <div className="edit-profile-button">
                      {userIsOwner(user, uid) ? <div onClick={() => setEditProfile(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#333"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z" /></svg>
                      </div> : null}
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="flex-row">
                      <p className="profile-name">{profileData.displayName}</p>
                      <p className="profile-pronouns">({profileData.pronouns})</p>
                    </div>
                    <p className="profile-bio">{profileData.bio}</p>
                  </div>
                </div>
                : null}
              {posts.map((data) => {
                return (
                  <Post data={data} />
                )
              })}
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Profile;