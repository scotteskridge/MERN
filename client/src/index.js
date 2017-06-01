import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Layout from "./componants/Layout"
import './static/App.css';

const root = document.getElementById('root')

ReactDOM.render(<App />, root );
// ReactDOM.render(<Layout />, document.getElementById('layout'));
registerServiceWorker();
