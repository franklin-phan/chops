import React , { useEffect, useState } from "react";
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
    const [followers, setFollowers] = useState()
    const [followers2, setFollowers2] = useState(["Beck", "Franklin"])

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
            // console.log('Document data:', doc.data());
        }
        db.collection("posts").where("uid", "==", uid).get()
        .then(snap => {
            setPosts(snap.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )))
                // console.log(doc.data())
        });
        const followersDisplayNames = []

        const followersObject = doc.data().followers
        // console.log(typeof(followersObject))
        const followersKeys = Object.keys(followersObject)
        const followersData = followersKeys.map(async (key) => {
            if (followersObject[key]) {
                // console.log(key)
                const followersName = await db.collection("users").doc(key).get()
                console.log(followersName.data().displayName)
                followersDisplayNames.push(followersName.data().displayName)
            }
        })
        console.log(followersDisplayNames)
        setFollowers(followersDisplayNames)
        // const followingData = doc.data().following.map((data) => {
        //     console.log(data)
        // })

        
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
       <div> 
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
                        {userIsOwner(user, uid) ? <button onClick={() => setEditProfile(true)}>Edit Profile</button> : null }
                        {console.log(profileData)}
                        {profileData ? 
                            <div>
                                <p>Profile Page!</p>   
                                <strong>{profileData.displayName}</strong>
                                <p>Pronouns: {profileData.pronouns}</p> 
                                <img src={profileData.pfpUrl}/>
                                <p>Bio: {profileData.bio}</p>
                                {console.log(followers)}
                                {/* {followers ? <div>Followers exist: {followers.map((data) => {
                                    return <h1>hello</h1>
                                })}</div> */}
                                 {/* : <p>No Followers</p>} */}
                                 {followers2 ? <div>Followers exist2: {followers2.map((data) => {
                                    return <h1>hello2</h1>
                                })}</div>
                                 : <p>No Followers2</p>}
 
                            </div>
                        : null }
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