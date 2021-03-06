import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase.js';

// import { auth, provider } from './google-signin'

import Feed from './Feed'
// import Navbar from './Navbar'
// import Homepage from './Homepage'
// import MakePost from './MakePost'

// import { HashRouter as Router, Route } from 'react-router-dom'

// Franklin was here

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:null
    }
  }
  handleCallback = (childData) =>{
    this.setState({data: childData})
  }
  render() {
    return (
      <div>
      <Feed parentCallback = {this.handleCallback}/>
      </div>
    );
  }
}

export default App;