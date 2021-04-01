import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { db } from '../../firebase';
import Post from '../Post/Post'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import EditProfile from './editProfile'
import { KeyboardArrowUpSharp } from "@material-ui/icons";
import UpdateFieldModal from "../Utils/EditModal"
import FollowerModal from "./FollowerModal/FollowerModal"
import './Profile.css'

function Profile() {
  // const { user } = props;
  const user = useSelector(selectUser);
  // console.log(user)

  const [uidInvalid, setUidInvalid] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [profileData, setProfileData] = useState()
  const [posts, setPosts] = useState([])
  const [s, setS] = useState(false)

  const [bio, setBio] = useState()
  const [headline, setHeadline] = useState()
  const [youtubeLink, setYoutubeLink] = useState()
  const [spotifyLink, setSpotifyLink] = useState()
  const [soundcloudLink, setSoundcloudLink] = useState()
  const [pronouns, setPronouns] = useState()
  const [displayName, setDisplayName] = useState()
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  let { uid } = useParams()
  useEffect(async () => {
    const profileDataRef = db.collection("users").doc(uid)
    const doc = await profileDataRef.get();
    if (!doc.exists) {
      setUidInvalid(true)
      console.log('No such document!');
      return
    } else {
      setProfileData(doc.data())
    }
    db.collection("posts").where("uid", "==", uid).get()
      .then(snap => {
        setPosts(snap.docs.map(doc => (
          {
            id: doc.id,
            data: doc.data(),
          }
        )))
      });

    // followers and following
    const followersObject = doc.data().followers
    if (!followersObject) {

    } else {
      const followersKeys = Object.keys(followersObject)
      const keys = []
      const promises = followersKeys.map((key) => {
        // console.log(followersObject[key])
        if (followersObject[key] === true) {
          keys.push(key)
          return db.collection("users").doc(key).get()
        }
      })
      // console.log(promises)

      if (promises[0]) {
        // console.log(promises) 
        Promise.all(promises).then((values) => {
          const followersNames = values.filter((value) => {
            if (!value) {
              return false; // skip
            }
            return true;
          }).map((value, index) => {
            // console.log(value)
            if (value) {
              return [value.data().displayName, keys[index], value.data().pfpUrl]
            }
          })
          // console.log(followersNames)
          setFollowers(followersNames)
        })
      }
    }
    const followingObject = doc.data().following
    // console.log(followingObject)
    if (!followingObject) {

    } else {
      const followingKeys = Object.keys(followingObject)
      const keys = []
      const promises = followingKeys.map((key) => {
        console.log(followingObject[key])
        if (followingObject[key]) {
          keys.push(key)
          return db.collection("users").doc(key).get()
        }
      })
      if (promises[0]) {
        // console.log(promises) 
        Promise.all(promises).then((values) => {
          const followingNames = values.filter((value) => {
            if (!value) {
              return false; // skip
            }
            return true;
          }).map((value, index) => {
            // console.log(value)
            if (value) {
              // console.log("YES")
              return [value.data().displayName, keys[index], value.data().pfpUrl]
            }
          })
          // console.log(followingNames)
          setFollowing(followingNames)
        })
      }
    }
    // s re renders
    if (!profileData) {
      setS(!s)
    } else {
      // console.log(profileData)
      setBio(profileData.bio)
      setHeadline(profileData.headline)
      setYoutubeLink(profileData.youtubeLink);
      setSpotifyLink(profileData.spotifyLink);
      setSoundcloudLink(profileData.soundcloudLink);
      setPronouns(profileData.pronouns)
      setDisplayName(profileData.displayName)
    }


  }, [s])

  function handleSubmit(e) {
    e.preventDefault();
    db.collection("users").doc(uid).update({
      bio: bio,
      headline: headline,
      youtubeLink: youtubeLink,
      soundcloudLink: soundcloudLink,
      spotifyLink: spotifyLink,
      pronouns: pronouns,
      displayName: displayName
    });
    setBio('');
    setHeadline('');
    setYoutubeLink('');
    setSpotifyLink('');
    setSoundcloudLink('');
    setPronouns('');
    setDisplayName('');
    setEditProfile(false);
    setS(!s)
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
  function changeHeadline(e) {
    setHeadline(e.target.value)
  }
  function changeYoutubeLink(e) {
    setYoutubeLink(e.target.value)
  }
  function changeSpotifyLink(e) {
    setSpotifyLink(e.target.value)
  }
  function changeSoundcloudLink(e) {
    setSoundcloudLink(e.target.value)
  }
  function cancelEdit() {
    setEditProfile(false)
  }
  async function followButtonFunctionality(uidCurrentUser, uidProfile) {
    // set the followed for profile user
    const followRef = db.collection('users').doc(uidProfile);
    const followedRef = `followers.${uidCurrentUser}`
    const res = await followRef.update({ [followedRef]: true });
    // set following for current user
    const followingRef = db.collection('users').doc(uidCurrentUser);
    const followingRefDatabase = `following.${uidProfile}`
    const res2 = await followingRef.update({ [followingRefDatabase]: true });
    setS(!s)
  }
  async function unfollowButtonFunctionality(uidCurrentUser, uidProfile) {
    const followRef = db.collection('users').doc(uidProfile);
    const followedRef = `followers.${uidCurrentUser}`
    const res = await followRef.update({ [followedRef]: false });
    // set following for current user
    const followingRef = db.collection('users').doc(uidCurrentUser);
    const followingRefDatabase = `following.${uidProfile}`
    const res2 = await followingRef.update({ [followingRefDatabase]: false });
    setS(!s)
  }
  function checkIfFollowed(uidCurrentUser, uidProfile) {
    // Takes the UID of the person logged in
    // Checks if that exists in profile users followers
    console.log(profileData)
    if (!profileData.followers) {
      return <button onClick={() => {
        followButtonFunctionality(uidCurrentUser.uid, uidProfile)
      }}>Follow</button>
    }
    if (profileData.followers[uidCurrentUser.uid]) {
      return <button onClick={() => unfollowButtonFunctionality(uidCurrentUser.uid, uidProfile)}>Unfollow</button>
    } else {
      return <button onClick={() => followButtonFunctionality(uidCurrentUser.uid, uidProfile)}>Follow</button>
    }
  }
  function displayFollow(user, uid) {
    if (userLoggedIn && !userIsOwner(user, uid)) {
      return checkIfFollowed(user, uid)
    }
  }
  return (
    <div className="profile">
      {uidInvalid ? <h1>Profile page does not exist!</h1> :
        <div>
          {editProfile ? <EditProfile
            headline={headline}
            soundcloudLink={soundcloudLink}
            spotifyLink={spotifyLink}
            youtubeLink={youtubeLink}
            changeSoundcloudLink={changeSoundcloudLink}
            changeSpotifyLink={changeSpotifyLink}
            changeYoutubeLink={changeYoutubeLink}
            bio={bio}
            pronouns={pronouns}
            displayName={displayName}
            changeHeadline={changeHeadline}
            changeBio={changeBio}
            changePronouns={changePronouns}
            changeDisplayName={changeDisplayName}
            cancelEdit={cancelEdit}
            uid={uid}
            s={s}
            setS={setS}
          /> :
            <div>
              {profileData ?
                <div>
                  <div className="profile-container">
                    <div className="profile-banner">
                      <img className="profile-image" src={profileData.pfpUrl} />
                      <div className="edit-profile-button">
                        {userIsOwner(user, uid) ? <div onClick={() => setEditProfile(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#ddd"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z" /></svg>
                        </div> : null}
                      </div>
                    </div>
                    <div className="profile-info">
                      <div className="profile-names-container">
                        <p className="profile-name">{profileData.displayName}</p>
                        <p className="profile-pronouns">({profileData.pronouns})</p>
                      </div>
                      <p className="profile-headline">{profileData.headline}</p>
                      <p className="profile-bio">{profileData.bio}</p>
                      <div className="followsCountContainer">
                        <FollowerModal modalName="Followers" users={followers} empty={`Nobody is following ${profileData.displayName} yet.`} />
                        <FollowerModal modalName="Following" users={following} empty={`${profileData.displayName} isn't following anyone yet.`} />
                      </div>
                      <ul className="social-medias" >
                        {profileData.spotifyLink ? <li ><a href={profileData.spotifyLink} className="social-media-link">
                          <svg className="social-media-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="#1ed760"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" /></svg>
                          Spotify
                        </a></li> : null}
                        {profileData.youtubeLink ? <li><a href={profileData.youtubeLink} className="social-media-link">
                          <svg className="social-media-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                          Youtube
                        </a></li> : null}
                        {profileData.soundcloudLink ? <li><a href={profileData.soundcloudLink} className="social-media-link">
                          <svg className="social-media-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff7700"><path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949z" /></svg>
                          Soundcloud
                        </a></li> : null}
                      </ul>
                    </div>
                    {/* Follow buttons */}
                    {userLoggedIn(user) ? displayFollow(user, uid) : null}

                  </div>
                  <p className="profile-feed-title">{profileData.displayName}'s Posts:</p>
                </div>
                : null}
              <div className='profile-feed-container'>
                <section className='profile-display-item'>
                  <div className="wrapper">
                    <ul>
                      {posts.map((data, index) => {
                        return (
                          <Post data={data} key={index} />
                        )
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          }
        </div>
      }
    </div >
  );
}

export default Profile;