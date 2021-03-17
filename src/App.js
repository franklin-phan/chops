import React, { Component } from 'react';
import './App.css';
import Feed from './Pages/Feed'

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