import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { db } from '../../firebase';
import Post from '../Post/Post'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import EditProfile from './editProfile'
import { KeyboardArrowUpSharp } from "@material-ui/icons";

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
        const followersObject = doc.data().followers
        if (!followersObject) {
    
        } else {
          const followersKeys = Object.keys(followersObject)
          const keys = []
          const promises = followersKeys.map((key) => {
            console.log(followersObject[key])
            if (followersObject[key] === true) {
              keys.push(key)
              return db.collection("users").doc(key).get()
            }
          })
          console.log(promises) 

          if (promises[0]) {
            // console.log(promises) 
            Promise.all(promises).then((values) => {
              const followersNames = values.filter((value) => {
                if (!value) {
                  return false; // skip
                }
                return true;
              }).map((value, index) => {
                console.log(value)
                if (value) {
                  // console.log("YES")
                  return [value.data().displayName, keys[index], value.data().pfpUrl]
                }
              })              
              console.log(followersNames) 
              setFollowers(followersNames)
            })
          }
        }
        const followingObject = doc.data().following
        console.log(followingObject)
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
              console.log(followingNames)
              setFollowing(followingNames)
            })
          }
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
        followButtonFunctionality(uidCurrentUser, uidProfile)
      }}>Follow</button>
    }
    if (profileData.followers[uidCurrentUser]) {
      return <button onClick={() => unfollowButtonFunctionality(uidCurrentUser, uidProfile)}>Unfollow</button>
    } else {
      return <button onClick={() => followButtonFunctionality(uidCurrentUser, uidProfile)}>Follow</button>
    }
  }
  function displayFollow(user, uid) {
    if (userLoggedIn && !userIsOwner(user, uid)) {
      return checkIfFollowed(user.uid, uid)
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
            handleSubmit={handleSubmit}
            cancelEdit={cancelEdit}
          /> :
            <div>
              {profileData ?
                <div>
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
                        <p className="profile-pronouns">{profileData.headline}</p>
                        <p className="profile-pronouns">({profileData.pronouns})</p>
                      </div>
                      <p className="profile-bio">{profileData.bio}</p>
                      <p>Social Medias:</p>
                      <ul>
                        {profileData.spotifyLink ? <li><a href={profileData.spotifyLink}>Spotify</a></li> : null}
                        {profileData.spotifyLink ? <li><a href={profileData.youtubeLink}>Youtube</a></li> : null}
                        {profileData.spotifyLink ? <li><a href={profileData.soundcloudLink}>Soundcloud</a></li> : null}
                      </ul>
                    </div>
                    {/* Follow buttons */}
                    {displayFollow(user, uid)}

                  </div>
                    {followers ? <ul>Followers: {followers.map((tuple) => {
                      return (
                        <li>
                          <a href={`/profile/${tuple[1]}`}><img src={tuple[2]}/>{tuple[0]}</a>
            
                        </li>
                      )
                    })}</ul>: <p>No Followers exist</p>}
                    {following ? <ul>Following: {following.map((tuple) => {
                      return (
                        <li>
                          <a href={`/profile/${tuple[1]}`}><img src={tuple[2]}/>  {tuple[0]}</a>
                        </li>                      )
                    })}</ul>: <p>You dont follow anyone</p>}
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
    </div>
  );
}

export default Profile;