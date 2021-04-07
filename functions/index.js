const functions = require("firebase-functions");

const cors = require('cors')
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');
const {
  getPosts
} = require('./post');
const {
  signup,
  login,
  loginWithGoogle
} = require('./Authentication/users');
const express = require('express');

const PORT = 5000;
const api = express();
// Questions 
// Is auth needed if they dont have postID and comment ID to access, or ect
api.use(cors())
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

const { admin, db } = require("./Authentication/users");

// You can evoke a function on user create
// And on user delete 
api.get('/hello', (req, res, next) => {
  res.send('Hello World from firebase, using NodeJS/EXPRESS')
})
//User
api.post('/signup', signup);
api.post('/login', login);
//AUTH
// users routes

// api.post('/signup', signup);
// api.post('/login', loginWithGoogle);
// api.post('/user/image', FBAuth, uploadImage);
// api.post('/user', FBAuth, addUserDetails);
// api.get('/user', FBAuth, getAuthenticatedUser);
// api.get('/user/:handle', getUserDetails);
// api.post('/notifications', FBAuth, markNotificationsRead);
//Populate UserData for comments/posts(PFP, DISPLAYNAME)

// Comments
//Send comment(Needs Auth)

// Delete comment(Needs Auth of some sort)
api.post('/commentDelete', async (req, res) => {
  const itemID = req.body.itemID
  const commentID = req.body.commentID
  if (!itemID || !commentID) {
    res.send("Missing parameter")
  }
  db.collection("posts").doc(itemID).collection("comments").doc(commentID).delete().then(() => {
    res.send("Successful Deletion")
  }).catch((error) => {
    console.error("Error removing document: ", error);
    res.send("Error removing document")
  });
})
// Snaps
api.post('/getSnapActive', async (req, res) => {
  const itemID = req.body.itemID
  const userID = req.body.uid
  if (!itemID || !userID) {
    res.send("Missing parameter")
  }
  const snapActiveRef = db.collection('snaps').doc(userID);
  const promise = await snapActiveRef.get()
  const result = promise.data()[itemID]
  res.send(result)
})
api.post('/snap', async (req, res, next) => {
  const itemID = req.body.itemID
  const userID = req.body.uid
  const increment = req.body.increment

  const postsRef = db.collection('posts').doc(itemID);
  const promise = await postsRef.get();
  const snaps = promise.data()['snaps']

  const snapsRef = db.collection('snaps').doc(userID);

  if (increment == true) {
    const updateVal = await postsRef.update({snaps: snaps + 1}, { merge: true });
    const updateBool = await snapsRef.set({ [itemID]: increment }, { merge: true });

    res.send(`Updated snaps value: ${snaps + 1}`)
  } else if (increment == false){
    const updateVal = await postsRef.update({snaps: snaps - 1}, { merge: true });
    const updateBool = await snapsRef.set({ [itemID]: increment }, { merge: true });

    res.send(`Updated snaps value: ${snaps - 1}`)
  } else {
    res.send('Error')
  }
})
////////Posts
// Remove item

// Get collection of comments on post

// Create post

/////// Feed
//Get posts
api.get('/getPosts', authMiddleware, getPosts);


/////// Profile

//Follow unfollow action

//Get followers

//Get following

//Get posts where userID exists in post

// Edit profile feed(Takes datatype, Data)Auth
api.listen(PORT, () => {
  console.log('Server is running on PORT: ', PORT)
})

exports.api = functions.https.onRequest(api)