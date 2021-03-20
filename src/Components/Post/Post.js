import React, { useEffect, useState } from "react";
import CommentInput from '../Comment/sendComment'
import CommentControls from '../Comment/CommentControls'
import Comment from '../Comment/comment'
import pfp from '../Comment/pfp.png'
import Snap from '../Snaps/snap'
import firebase from '../../firebase'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'

import Time from '../../Time'
function Post(data) {
  const user = useSelector(selectUser);
  console.log(user)
  const [comments, setComments] = useState([])
  const itemID = data.data.id
  const { postedBy, snaps, songLink, timestamp, title } = data.data.data
  const { email, displayName, photoUrl } = postedBy
  const [showComments, setShowComments] = useState(false)

  // console.log(timestamp)
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
    // console.log(timestamp)
    // let date = timestamp.toDate();
    // let mm = date.getMonth();
    // let dd = date.getDate();
    // let yyyy = date.getFullYear();
    let date = Time(timestamp.toDate())
    // console.log(date)

    // date = mm + '/' + dd + '/' + yyyy;
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
    <li key={itemID} className="post-container">

      <div className="post-header">
        <div className="user-profile">
          <img src={photoUrl} class="" />
        </div>
        <div className="centered-flex-column">
          <p className="post-author">{displayName}</p>
          <time>{convertTimestamp(timestamp)}</time>
        </div>
      </div>

      <hr style={{ margin: "0 20px" }}></hr>
      <p>{title}</p>

      {/* Media Display */}
      {songLink.search("soundcloud") !== -1 ?
        <iframe title="post" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
          src={"https://w.soundcloud.com/player/?url=" + songLink + "&am;"}>
        </iframe> : null}
      {songLink.search("spotify") !== -1 ?
        <iframe src={(songLink).replace("track", "embed/track")} title="post" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
      {songLink.search("youtube") !== -1 ?
        <iframe title="post" width="100%" height="166" src={(songLink).replace("watch?v=", "embed/")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : null}
      <div>
        {displayName === user.displayName || email === user.email ?
          <button onClick={() => removeItem(itemID)}>Remove Item</button> : null}
      </div>



      {/* Profile Picture */}
      {/* <img src={pfp} width="30px" height="30px" /> */}

      <div className="post-actions-container">
        {/* Snaps */}
        <Snap snaps={snaps} itemID={itemID} userID={user.uid} />
        <CommentControls />
      </div>



      {/* Comments if not undefined */}
      {comments.map((comment) => {
        // console.log(comment)
        return (
          <Comment data={comment} itemID={itemID} />
        )
      })}

      <div>{showComments ?
        /* Comment Form */
        <CommentInput itemID={itemID} userID={user.uid} user={user.displayName} hidden={false} />
        : null}
      </div>








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