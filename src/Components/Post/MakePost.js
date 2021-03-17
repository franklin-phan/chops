import React, {useState} from "react";
import PostForm from './PostForm';
import firebase from '../../firebase.js';
import Moment from 'moment';

function MakePost(user) {
   const [title, setTitle] = useState();
   const [songLink, setSongLink] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(user.user.displayName)

        const itemsRef = firebase.database().ref('items');
        const item = {
            title: title,
            songLink: songLink,
            time: Moment(Date.now()).format('ll'),
            postedBy: user.user.displayName,
        };
        itemsRef.push(item);
        // Reset values of state?
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