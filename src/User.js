import firebase from './firebase.js';

export function CreateUser(username, email, id) {
    firebase.database().ref('users/' + id).set({
        username: username,
        email: email,
        id: id
    });
}
export default function InitUser() {
    const itemsRef = firebase.database().ref('users');
    itemsRef.on('value', (snapshot) => {
      let users = snapshot.val();
      console.log("users:")
      console.log(users)
      let newState = [];
      for (let user in users) {
        newState.push({
          id: user,
          email: users[user].email,
          username: users[user].username,
          snaped: users[user].snaped
        });
      }
      console.log("newState:")
      console.log(newState)
    })
}


