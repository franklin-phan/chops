import React , { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { db } from '../../firebase';
import Post from '../Post/Post'

function Profile() {
    const [uidInvalid, setUidInvalid] = useState(false)
    const [profileData, setProfileData] = useState()
    const [posts, setPosts] = useState([])

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
        // db.collection("posts").where("uid", "==", uid).onSnapshot(snapshot => (
        //     setPosts(snapshot.docs.map(doc => (
        //         {
        //             id: doc.id,
        //             data: doc.data(),
        //         }
        //     )))
        // ))
        // console.log(posts)
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

    return (
       <div> 
           {uidInvalid ? <h1>Profile page does not exist!</h1> : 
            <div>
                {console.log(profileData)}
                <p>Profile Page!</p>   
                <p>User: {uid}</p> 
                {profileData ? <p>Bio: {profileData.bio}</p> : null}
                {posts.map((data) => {
                        return (
                            <Post data={data} />
                        )
                    })}
            </div>
           }
       </div>
    );
}

export default Profile;