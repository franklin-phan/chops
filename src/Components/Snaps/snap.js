import React, { useState, useEffect } from "react";
// import firebase from '../../firebase.js';
import firebase from 'firebase';

import snapTrue from './snapTrue.png'
import snapFalse from './snapFalse.png'
import { db } from '../../firebase';
import { userLoggedIn } from "../Authentication/IsLoggedIn";

export default function Snap({ snaps, itemID, user, isLoggedIn }) {
    const [curSnaps, setSnap] = useState(snaps)
    const [curSnapActive, setSnapActive] = useState()

    useEffect(async () => {
        try {
            const usersSnaps = db.collection('snaps').doc(user.uid);
            const doc = await usersSnaps.get();
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // console.log('Document data:', doc.data());
                setSnapActive(doc.data()[itemID])
            }
            db.collection("snaps").doc(user.uid)
        } catch (error) {
            console.log("User not logged in yet: Snap")
        }  
      }, [])

    async function setSnapState(bool) {
        const snapStateRef = db.collection('snaps').doc(user.uid);
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
    function displaySnap() {
        // console.log(isLoggedIn)
        return isLoggedIn ? 
            <div>
                {/* Snaps */}
                {curSnapActive === true ?
                    <div onClick={handleSnap} className="post-info-container">
                        <img src={snapTrue} width="30" height="30" alt='Snap True' className="snap-image"/>
                        <p>{curSnaps}</p>
                    </div>
                    : <div onClick={handleSnap} className="post-info-container">
                        <img src={snapFalse} width="30" height="30" alt='Snap False'/>
                        {curSnaps > 0 ? <p>{curSnaps}</p>:<p></p>}
                    </div>}
            </div> 
        : <div><img src={snapFalse} alt='Snap False'/><p>{curSnaps}</p></div>
    }
  
    return (
        <div>
            {displaySnap()}
        </div>
    );
    

}