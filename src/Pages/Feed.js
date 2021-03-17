import React, { Component } from 'react';
import '.././App.css';
import firebase from '../firebase.js';
import Post from '../Components/Post/Post'
import { auth } from '../google-signin'

import Navbar from '../Components/Navbar/Navbar'
import Homepage from './Homepage'
import MakePost from '../Components/Post/MakePost'

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      linkValue:'',
      typeValue:'',
      time: '',
      username: '',
      items: [],
      user: null,
      show: false,
      snaps: 0,
      snapActive: false
    }
    this.logout = this.logout.bind(this);
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      console.log(items)
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          songLink: items[item].songLink,
          postedBy: items[item].postedBy,
          comments: items[item].comments,
          time: items[item].time,
          snaps: items[item].snaps,
          snapActive: items[item].snapActive
        });
      }
      console.log(newState)
      this.setState({
        items: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  
  onTrigger = () => {
    this.props.parentCallback("Data from child");
}
  render() {
    return (
      <div className='app'>
        {/* If logged into google account display everything */}
        {this.state.user ?
          <div>
            <Navbar 
              user={this.state.user}
              username={this.state.username}
              logout={this.logout}
            />
            <div className='user-profile'>
              <img src={this.state.user.photoURL}/>
            </div>
            <div className='container'>
              {/* Form goes here */}
            <MakePost user={this.state.user}/>
            <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <Post item={item} user={this.state.user.displayName} email={this.state.user.email}/>
                    )
                  })}
                </ul>
              </div>
            </section>

            </div>
          </div>
          :
          // Else homepage
          <div> 
            <Homepage />
          </div>
        }
      </div>
    );
  }
}

export default Feed;