import React from "react";
import pfp from './pfp.png'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import {db} from '../../firebase'
function Comment({ data, itemID }) {
  const user = useSelector(selectUser);

  const {id, comment} = data
  const {body, postedBy, timestamp} = comment
  console.log(comment)
  function convertTimestamp(timestamp) {
    if (!timestamp) {
      return null
    }
    let date = timestamp.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
  
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }
  function removeItem() {
    db.collection("posts").doc(itemID).collection("comments").doc(id).delete().then(() => {
        // console.log(id)
        // console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
  return (
    <div className="comment">
      <img src={pfp} width="30px" height="30px"/>
      <p>
        <strong>{postedBy}</strong> {body}
      </p>
      <time>{convertTimestamp(timestamp)}</time>
      {postedBy === user.displayName || postedBy === user.displayName ?
      <button onClick={() => removeItem(id)}>Remove Item</button> : null}
    </div>
  );
}

export default Comment;