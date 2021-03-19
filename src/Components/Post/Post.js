import React , { useEffect, useState }from "react";
import CommentInput from '../Comment/sendComment'
import Comment from '../Comment/comment'
import pfp from '../Comment/pfp.png'
import Snap from '../Snaps/snap'
import firebase from '../../firebase'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'

function Post(data) {
    const user = useSelector(selectUser);

    const [comments, setComments] = useState([])
    const itemID = data.data.id
    const {postedBy, snaps, songLink, timestamp, title} = data.data.data
    const {email, displayName} = postedBy
    console.log(timestamp)
    useEffect(async () => {
        const postCommentsRef = db.collection("posts").doc(itemID).collection("comments")
        const res = await postCommentsRef.orderBy('timestamp', 'desc').onSnapshot(async snapshot => (
        await setComments(snapshot.docs.map(doc => (
            {
              id: doc.id,
              comment: doc.data(),
            }
          )))
        ))
    }, [])
    function convertTimestamp(timestamp) {
        if (!timestamp) {
            return 'test'
        }
        let date = timestamp.toDate();
        let mm = date.getMonth();
        let dd = date.getDate();
        let yyyy = date.getFullYear();
      
        date = mm + '/' + dd + '/' + yyyy;
        return date;
      }
    function removeItem() {
        db.collection("posts").doc(itemID).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <li key={itemID}>
            <h3>{title}</h3>
            {songLink.search("soundcloud") !== -1 ?
                <iframe title="post"width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                src={"https://w.soundcloud.com/player/?url="+ songLink +"&am;"}>
                </iframe> : null}
            {songLink.search("spotify") !== -1 ? 
                <iframe src={(songLink).replace("track", "embed/track")} title="post" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
            {songLink.search("youtube") !== -1 ?
                <iframe title="post" width="100%" height="166" src={(songLink).replace("watch?v=", "embed/")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : null}
            <p>Posted by: {displayName}
                {displayName === user.displayName || email === user.email ?
                <button onClick={() => removeItem(itemID)}>Remove Item</button> : null}
            </p>
            {/* Profile Picture */}
            <img src={pfp} width="30px" height="30px"/>
            {/* Time Posted */}
            <time>{convertTimestamp(timestamp)}</time>
            {/* Snaps */}
            <Snap snaps={snaps} itemID={itemID} userID={user.uid}/>
            {/* Comment Form */}
            <CommentInput itemID={itemID} userID={user.uid} user={postedBy}/>

            {/* Comments if not undefined */}
            {comments.map((comment) => {
                console.log(comment)
                  return (
                    <Comment data={comment}/>
                  )
                })}
            {/* {item.item.comments != undefined ?
                item.item.comments.map((comment) => {
                    return (
                        <div>
                            <Comment comment={comment.comment} username={comment.username} time={comment.time}/>
                            {comment.username === item.user || comment.username === item.email ?
                            <button onClick={() => this.removeItem(item.item.comments[0])}>Remove Item</button> : null}
                        </div>
                    )
            }) : null} */}
        </li>
    );
}

export default Post;