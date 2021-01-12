import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

import { auth, provider } from './google-signin'

import Navbar from './Navbar'
import Homepage from './Homepage'
import MakePost from './MakePost'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      linkValue:'',
      typeValue:'',
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
      link: this.state.linkValue,
      type: this.state.typeValue,
      user: this.state.user.displayName || this.state.user.email,
    };
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      linkValue:'',
      typeValue:'',
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
          link: items[item].link,
          type: items[item].type,
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
        linkValue={this.state.linkValue}
        typeValue={this.state.typeValue}
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
                  {item.type === "SoundCloud" ?
                      <iframe title="post"width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                      src={"https://w.soundcloud.com/player/?url="+ item.link +"&am;"}>
                    </iframe> : null}
                  {item.type === "Spotify" ? 
                      <iframe src={(item.link).replace("track", "embed/track")} title="post" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
                  {item.type === "YouTube" ?
                    <iframe title="post" width="100%" height="166" src={(item.link).replace("watch?v=", "embed/")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : null}
                  <p>Posted by: {item.user}
                    {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                  </p>
                  
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {/* <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.state.items.map((item) => {
              return (
                <li key={item.id}>
                    {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                      <div>
                      <h3>{item.title}</h3>
                  <iframe title="post"width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                      src={"https://w.soundcloud.com/player/?url="+ item.link +"&am;"}>
                  </iframe>


                      <p>Posted by: {item.user}
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                      </p>
                      </div> : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section> */}
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

export default App;