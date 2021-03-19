import React, {useState} from "react";
import PostForm from './PostForm';
// import firebase from '../../firebase.js';
import { db } from '../../firebase';
import firebase from 'firebase';

function MakePost(user) {
   const [title, setTitle] = useState();
   const [songLink, setSongLink] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        db.collection("posts").add({
            title: title,
            songLink: songLink,
            postedBy: user.user,
            snaps: 0,
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
       <div>
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