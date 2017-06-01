import React from "react"
import logo from './../static/logo.svg';
// import './../App.css';

export default class Header extends React.Component {
    render(){
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
             </div>
        )
    }
}