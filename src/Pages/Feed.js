import React, { Component } from 'react';
import '.././App.css';
import firebase from '../firebase.js';
import Post from '../Components/Post/Post'
import { auth } from '../google-signin'

import Navbar from '../Components/Navbar/Navbar'
import Homepage from './Homepage'
import MakePost from '../MakePost'
import Moment from 'moment'

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      link: this.state.linkValue,
      type: this.state.typeValue,
      time: Moment(Date.now()).format('ll'),
      snaps: this.state.snaps,
      snapActive: this.state.snaps,
      user: this.state.user.displayName || this.state.user.email,
    };
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      linkValue:'',
      typeValue:'',
      username: '',
      time: '',
      snaps: 0,
      snapActive: false
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
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          link: items[item].link,
          type: items[item].type,
          user: items[item].user,
          comments: items[item].comments,
          time: items[item].time,
          snaps: items[item].snaps,
          snapActive: items[item].snapActive
        });
        console.log(this.state.user)

        console.log(item)
      }
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
            <MakePost 
              nameValue={this.state.user.displayName || this.state.user.email}
              postValue={this.state.currentItem}
              linkValue={this.state.linkValue}
              typeValue={this.state.typeValue}
              time={Moment(Date.now()).format('ll')}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
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