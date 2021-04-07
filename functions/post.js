const { admin, db } = require("./Util/admin");

/////// Feed
//Get posts
exports.getPosts = (req, res) => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
      res.send(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
}
