import React, { Component } from 'react';
import { observer } from "mobx-react"

import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Layout from './componants/Layout';
import Dominion from "./pages/Dominion"
import Tutorial from "./pages/Tutorial"
import Welcome from "./pages/Welcome"
import Nav from "./componants/Nav"

// import './App.css';

//this is likely one extra layer of wrappI dont need may need to move
//alyout to the app level... or just do away with layout not sure yet

//I'm pretty sure I'm going to keep my redux store at this app level, but I may modularize it out and then
//import it not sure yet, but I think that the reducer functions and store will all need to be
//methods and attributes of App class, and that I'll include app in the componant level and run
// the app reducer methods from the child leaves. I wonder if I need to .bind(this) at this level 
//not sure yet









export default class App extends Component {
  //state is internal and only effects this comp.
  //props are for injecting
  // state = {
  //   user : {},
  //   game : {},
  //   samples: {
  //     count : 0
  //   }
  // }
  // app = document.getElementsByClassName("App")
  constructor(props){
    super(props)
    
    
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
  
      
         
        
        
        
      </div>
    </Router>
    );
  }
}

//I see this often as small sub components
/*const SomeOtherApp = () => (
  <div>
  
  </div>
)*/
