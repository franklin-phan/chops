import React from "react";
import pfp from './pfp.png'
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import { db } from '../../firebase'
import Time from '../../Time'

function Comment({ data, itemID, isLoggedIn }) {
  const user = useSelector(selectUser);

  const { id, comment } = data
  const { body, postedBy, timestamp } = comment
  console.log(comment)
  function convertTimestamp(timestamp) {
    if (!timestamp) {
      return 'test'
    }
    console.log(timestamp)
    // let date = timestamp.toDate();
    // let mm = date.getMonth();
    // let dd = date.getDate();
    // let yyyy = date.getFullYear();
    let date = Time(timestamp.toDate())
    console.log(date)

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
    return isLoggedIn ? <div>{postedBy === user.displayName || postedBy === user.displayName ?
        <div className="delete-comment-button" onClick={() => removeItem(id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="tomato"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" /></svg></div> : null}
    </div> : null
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