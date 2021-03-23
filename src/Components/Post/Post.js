import React, { useEffect, useState } from "react";
import CommentInput from '../Comment/sendComment'
import CommentControls from '../Comment/CommentControls'
import Comment from '../Comment/comment'
// import pfp from '../Comment/pfp.png'
import Snap from '../Snaps/snap'
// import firebase from '../../firebase'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'
import ReactPlayer from 'react-player'
import ConfirmDeleteModal from '../Utils/ConfirmDeleteModal'

import Time from '../../Time'
function Post(data) {
  const user = useSelector(selectUser);
  // console.log(user)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const itemID = data.data.id
  const { postedBy, snaps, songLink, timestamp, title } = data.data.data
  const { email, displayName, uid, photoUrl } = postedBy
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
      return null
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

  function toggleComments() {
    setShowComments(!showComments)
  }

  return (
    <li key={itemID} className="post-container">
      <div className="post-header">
        <a href={`/profile/${uid}`}>
          <div className='user-profile'>
            <img src={photoUrl} />
          </div>
        </a>
        <div className="centered-flex-column">
          <p className="post-author"><a href={`/profile/${uid}`}>{displayName}</a></p>
          <time>{convertTimestamp(timestamp)}</time>
        </div>
        {userIsOwner(user, uid) ?
          <ConfirmDeleteModal deleteItem={() => removeItem(itemID)} itemName="post" />
          : null}
      </div>

      {/* <hr style={{ margin: "0 20px" }}></hr> */}
      <p>{title}</p>

      {/* Media Display */}
      {songLink.search("soundcloud") !== -1 ?
        <ReactPlayer width="100%" url={songLink} /> : null}
      {songLink.search("spotify") !== -1 ?
        <div><iframe src={(songLink).replace("track", "embed/track")} title="post" width="100%" height="100%" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></div> : null}
      {songLink.search("youtube") !== -1 ?
        <ReactPlayer width="100%" url={songLink} /> : null}
      <div>
      </div>

      <div className="post-actions-container">
        {/* Snaps */}
        <Snap snaps={snaps} itemID={itemID} user={user} isLoggedIn={userLoggedIn(user)} />
        <CommentControls commentToggle={toggleComments} commentCount={comments.length} isActive={showComments} />
      </div>

      {/* Comments if not undefined */}
      {comments.map((comment, index) => {
        return showComments ? (
          <Comment data={comment} user={user} itemID={itemID} key={index + itemID} isLoggedIn={userLoggedIn(user)} />
        ) : null
      })}

      <div>{showComments ?
        /* Comment Form */
        <CommentInput itemID={itemID} user={user} hidden={false} isLoggedIn={userLoggedIn(user)} />
        : null}
      </div>

    </li>
  );
}

export default Post;