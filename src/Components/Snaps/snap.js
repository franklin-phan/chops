import React, { useState, useEffect } from "react";
// import firebase from '../../firebase.js';
import firebase from 'firebase';

import snapTrue from './snapTrue.png'
import snapFalse from './snapFalse.png'
import { db } from '../../firebase';

function Snap({ snaps, itemID, userID }) {
  const [curSnaps, setSnap] = useState(snaps)
  const [curSnapActive, setSnapActive] = useState()
  useEffect(async () => {
    const usersSnaps = db.collection('snaps').doc(userID);
    const doc = await usersSnaps.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      // console.log('Document data:', doc.data());
      setSnapActive(doc.data()[itemID])
    }
    db.collection("snaps").doc(userID)
  }, [])

  async function setSnapState(bool) {
    const snapStateRef = db.collection('snaps').doc(userID);
    const res = await snapStateRef.set({ [itemID]: bool }, { merge: true });
    // console.log(res)
  }
  async function updateSnapCount(inc) {
    const snapStateRef = db.collection('posts').doc(itemID);
    const res = await snapStateRef.update({ snaps: firebase.firestore.FieldValue.increment(inc) }, { merge: true });
    // console.log(res)
  }

  function handleSnap() {
    if (curSnapActive === true) {
      // delete snap
      setSnapState(false)
      updateSnapCount(-1)
      setSnapActive(false)
      setSnap(curSnaps - 1)
    } else {
      // add snap
      updateSnapCount(1)
      setSnapState(true)
      setSnapActive(true)
      setSnap(curSnaps + 1)
    }
  }
  return (
    <div>
      {/* Snaps */}

      <div onClick={handleSnap} className="post-info-container">
        <div>
          {curSnapActive === true ?
            <img src={snapTrue} alt='Snap True' className="snap-image" />
            :
            <img src={snapFalse} alt='Snap False' />
          }
        </div>

        <p>{curSnaps}</p>
      </div>

    </div>
  );
}

export default Snap;