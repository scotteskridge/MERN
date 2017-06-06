import React from 'react';

import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import { IndexRoute, Switch, Router, Route, hashHistory } from "react-router" //need history
// import { BrowserRouter as Router, Link, Route} from "react-router-dom"
// import './index.css';
import 'semantic-ui-css/semantic.min.css';
import './static/App.css';
import store from "./store"



import App from './App';
// import Layout from './componants/Layout';
// import Dominion from "./pages/Dominion"
// import Tutorial from "./pages/Tutorial"
// import Welcome from "./pages/Welcome"
// import Layout from "./componants/Layout"



const root = document.getElementById('root')


//router needs history = {hashHistory}
ReactDOM.render(
    <App  store = {store}/>,    root );

registerServiceWorker();
