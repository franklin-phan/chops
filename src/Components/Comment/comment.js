import React from "react";
import pfp from './pfp.png'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import { db } from '../../firebase'
import Time from '../../Time'
import ConfirmDeleteModal from '../Utils/ConfirmDeleteModal'
import { userIsOwner } from '../Authentication/IsLoggedIn'
function Comment({ data, itemID, isLoggedIn, user }) {
  // const user = useSelector(selectUser);
  const { id, comment } = data
  const { body, postedBy, timestamp, pfpUrl, uid } = comment

  function convertTimestamp(timestamp) {
    if (!timestamp) {
      return null
    }
    let date = Time(timestamp.toDate())
    return date;
  }
  function removeItem() {
    db.collection("posts").doc(itemID).collection("comments").doc(id).delete().then(() => {
      // console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  function displayDeleteButton() {
    return <ConfirmDeleteModal deleteItem={() => removeItem(id)} itemName="comment" />
  }

  function shouldDisplayDelete(user) {
    if (userIsOwner(user, uid) == true) {
      return displayDeleteButton()
    }
    return null
  }
  return (
    <div className="comment">
      <div className="comment-content">
        <img src={pfpUrl} width="30px" height="30px" />
        <p className="comment-text">
          <strong>{postedBy}</strong> {body}
        </p>
        {isLoggedIn ? shouldDisplayDelete(user) : null}
      </div>
      <time className="comment-timestamp">{convertTimestamp(timestamp)}</time>
    </div >
  );
}

export default Comment;