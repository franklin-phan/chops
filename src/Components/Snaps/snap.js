import React, {useState} from "react";
import firebase from '../../firebase.js';
import snapTrue from './snapTrue.png'
import snapFalse from './snapFalse.png'

function Snap({ snaps, snapActive, id }) {
    console.log(snapActive)
    const [curSnaps, setSnap] = useState(snaps)
    const [curSnapActive, setSnapActive] = useState(snapActive)

    function handleSnap() {
        if (curSnapActive === true) {
            // delete snap
            // firebase.database().ref(`/items/${id}/snaps`).set(curSnaps - 1);

            firebase.database().ref(`/items/${id}`).update({ snaps: curSnaps - 1});
            firebase.database().ref(`/items/${id}`).update({ snapActive: false});
            setSnapActive(false)
            setSnap(curSnaps - 1)
        } else {
            // add snap
            // firebase.database().ref(`/items/${id}/snaps`).set(curSnaps + 1);

            firebase.database().ref(`/items/${id}`).update({ snaps: curSnaps + 1});
            firebase.database().ref(`/items/${id}`).update({ snapActive: true});
            setSnapActive(true)
            setSnap(curSnaps + 1)
        }
    }
    return (
        <div>
            {/* Snaps */}
            <p>Snaps: {curSnaps}</p>
            <button onClick={handleSnap}>Snap</button>
            {curSnapActive === true ?
                <img src={snapTrue}/>
            : <img src={snapFalse}/>}
        </div>
    );
}

export default Snap;