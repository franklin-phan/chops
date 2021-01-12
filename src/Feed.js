import React, { Component } from 'react';
// import './App.css';
import firebase from './firebase.js';

import { auth, provider } from './google-signin'

import Navbar from './Navbar'
import Homepage from './Homepage'
import MakePost from './MakePost'

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
      show: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
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
  login() {
    auth.signInWithRedirect(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email,
    };
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
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
          user: items[item].user
        });
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
  
  render() {
    return (
      <div className='app'>
        <Navbar user={this.state.user} logout={this.logout}/>
  {this.state.user ?
    <div>
      <div className='user-profile'>
        <img src={this.state.user.photoURL} alt='ProfilePic'/>
      </div>
      <div className='container'>
      <MakePost 
        nameValue={this.state.user.displayName || this.state.user.email}
        postValue={this.state.currentItem}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        />
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.state.items.map((item) => {
              return (
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  <p>brought by: {item.user}
                    {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.state.items.map((item) => {
              return (
                <li key={item.id}>
                    {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                      <div>
                      <h3>{item.title}</h3>
                      <p>brought by: {item.user}
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                      </p>
                      </div> : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
  </div>
    </div>
    :
    <div> 
      <Homepage />

    </div>

   
  }

</div>
    );
  }
}

export default Feed;