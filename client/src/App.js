import React, { Component } from 'react';
import { observer, Provider } from "mobx-react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import store  from "./store"
import Layout from './pages/tutorial/Layout';
import Dominion from "./pages/Dominion"
import Tutorial from "./pages/Tutorial"
import Welcome from "./pages/Welcome"
import Nav from "./pages/tutorial/Nav"

// import './App.css';

//this is likely one extra layer of wrappI dont need may need to move
//alyout to the app level... or just do away with layout not sure yet

//learning react-provider with stores see here: http://frontendinsights.com/connect-mobx-react-router/
//not sure I need mroe than one store but see this code if I do
// import { Provider } from 'mobx-react';
// import store1 from './stores/store1';
// import store2 from './stores/store2';
 
// const stores = { store1, store2 };


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
    // console.log(this.props)
    this.props.history.push("/")
  }

  render() {
    // setTimeout(() => {
    //   this.setState({name : "State changed"})
    // }, 2000)
    return (
      <Provider store = {store}>  
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
      </Provider>
    );
  }
}

//I see this often as small sub components
/*const SomeOtherApp = () => (
  <div>
  
  </div>
)*/
