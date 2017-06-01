import React, { Component} from "react"


export default class Body extends React.Component {
    state = {users: []}
    // app = document.getElementsByClassName("App")
    fooObj = {
        1:1,
        2:2
    }
    constructor(){
        super()
    }
    componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    }

    classMethod(){
        return "Scott"
    }

    render(){
        return (
            <div className="App">
        
        <p className="App-intro">
         Lets Make MERN Dominion Happen! 
        </p>

        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}

        <h4>{this.classMethod()}</h4>
       
        
      </div>
        )
    }
}

