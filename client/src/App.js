import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"

import Layout from './componants/Layout';
import Dominion from "./pages/Dominion"
import Tutorial from "./pages/Tutorial"
import Welcome from "./pages/Welcome"
import Nav from "./componants/Nav"
// import './App.css';

//this is likely one extra layer of wrappI dont need may need to move
//alyout to the app level... or just do away with layout not sure yet

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
export default class App extends Component {
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
  navigate(){
    console.log(this.props)
    this.props.history.push("/")
  }

  render() {
    // setTimeout(() => {
    //   this.setState({name : "State changed"})
    // }, 2000)
    return (
     <Router>
        <div  className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Layout}/>
            <Route path="/dominion" component={Dominion}/>
            <Route path="/welcome" component={Welcome}/>
            <Route path="/tutorial" component={Tutorial}/>
            <Route render={() =>{
              return <p> Not Found </p>
               }
            } />
          </Switch>
  
      
         
         <button className="ui button" onClick = {this.navigate.bind(this)}>Domion Nav</button>
        
        
      </div>
    </Router>
    );
  }
}

//I see this often as small sub components
const SomeOtherApp = () => (
  <div>
  
  </div>
)
