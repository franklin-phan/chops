import firebase from 'firebase'
const admin = require('firebase-admin');

const app = admin.initializeApp({
    apiKey: "AIzaSyDl1h-YYooOKqWdOvpBoDMq1yFcoC1InCc",
    authDomain: "chops-3f363.firebaseapp.com",
    databaseURL: "https://chops-3f363-default-rtdb.firebaseio.com",
    projectId: "chops-3f363",
    storageBucket: "chops-3f363.appspot.com",
    messagingSenderId: "117004854879",
    appId: "1:117004854879:web:448bef686f5ed1d4721dea",
    measurementId: "G-1WRXC3JY45"
  });
firebase.initializeApp({
    apiKey: "AIzaSyDl1h-YYooOKqWdOvpBoDMq1yFcoC1InCc",
    authDomain: "chops-3f363.firebaseapp.com",
    databaseURL: "https://chops-3f363-default-rtdb.firebaseio.com",
    projectId: "chops-3f363",
    storageBucket: "chops-3f363.appspot.com",
    messagingSenderId: "117004854879",
    appId: "1:117004854879:web:448bef686f5ed1d4721dea",
    measurementId: "G-1WRXC3JY45"
  });

export const db = firebase.firestore()
export const auth = firebase.auth();

export default app;