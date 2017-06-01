import React, { Component } from 'react';
import Layout from "./componants/Layout"

// import './App.css';

//this is likely one extra layer of wrappI dont need may need to move
//alyout to the app level... or just do away with layout not sure yet
class App extends Component {
  //state is internal and only effects this comp.
  //props are for injecting
  state = {}
  // app = document.getElementsByClassName("App")
  constructor(){
    super()
    // this.state = {name : "My State Name variable"}
  }

  componentDidMount() {
    
  }

  classMethod(){
    
  }

  render() {
    // setTimeout(() => {
    //   this.setState({name : "State changed"})
    // }, 2000)
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
