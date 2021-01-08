import firebase from "firebase/app";
import "firebase/auth";

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth()
