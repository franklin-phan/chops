import React, { useState, useEffect } from "react";
import PostForm from './PostForm';
// import firebase from '../../firebase.js';
import { db } from '../../firebase';
import firebase from 'firebase';

function MakePost(user) {
    const [title, setTitle] = useState();
    const [songLink, setSongLink] = useState();
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

    function handleSubmit(e) {
        e.preventDefault();
        db.collection("posts").add({
            title: title,
            songLink: songLink,
            displayName: displayName,
            pfpUrl: pfpUrl,
            snaps: 0,
            uid: user.user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTitle('');
        setSongLink('');
    }

    function changeTitle(e) {
        setTitle(e.target.value)
    }
    function changeSongLink(e) {
        setSongLink(e.target.value)
    }

    return (
        <div className='add-item'>
            <PostForm
                changeTitle={changeTitle}
                changeSongLink={changeSongLink}
                handleSubmit={handleSubmit}
                title={title}
                songLink={songLink}
            />
        </div>
    );
}

export default MakePost;