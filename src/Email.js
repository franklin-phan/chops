import firebase from "firebase/app"
import "firebase/auth"
import {email, password } from './SignUpModal'

// Register a new user
export const register = firebase.auth().createUserWithEmailAndPassword(email, password)
 .catch(function (err) {
   // Handle errors
 });

// Sign in existing user
export const SignIn = firebase.auth().signInWithEmailAndPassword(email, password)
 .catch(function(err) {
   // Handle errors
 });