import { db } from '../../firebase'
import firebase from 'firebase'
export default async function CreateUserData(user) {
    // Check if data already exists
    console.log(user)
    const profileDataRef = db.collection("users").doc(user.uid)
    const doc = await profileDataRef.get();
    console.log(doc)
    if (!doc.exists) {
        db.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            bio: '',
            pronouns: '',
            pfpUrl: user.photoUrl,
            accountCreated: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
        console.log('Account data already initilzed:', doc.data());
    }
}