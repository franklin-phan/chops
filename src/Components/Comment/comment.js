import React from "react";
import pfp from './pfp.png'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import { db } from '../../firebase'
import Time from '../../Time'
import ConfirmDeleteModal from '../Utils/ConfirmDeleteModal'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'

function Comment({ data, itemID, isLoggedIn }) {
  const user = useSelector(selectUser);

  const { id, comment } = data
  const { body, postedBy, timestamp } = comment
  // console.log(comment)
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
    db.collection("posts").doc(itemID).collection("comments").doc(id).delete().then(() => {
      console.log(id)
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  function displayDeleteButton() {

    return userIsOwner(user, id) ?
      <ConfirmDeleteModal deleteItem={() => removeItem(id)} itemName="comment" />
      : null

  }

  return (
    <div className="comment">
      <div className="comment-content">
        <img src={pfp} width="30px" height="30px" />
        <p className="comment-text">
          <strong>{postedBy}:</strong> {body}
        </p>
        {displayDeleteButton()}
      </div>
      <time className="comment-timestamp">{convertTimestamp(timestamp)}</time>
    </div >
  );
}

export default Comment;