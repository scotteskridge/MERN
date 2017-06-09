import React from "react"
import { NavLink} from "react-router-dom" //not sure the difference between Link and NavLink

export default class Nav extends React.Component {
    // constructor(props){
    //     super(props)
    //     console.log("so my constructor isn't useless")
    // }
    render(){
        return (
            <div className="Nav">
                <NavLink exact activeClassName ="active" className="ui button" to ="/"> Home </NavLink>
                <NavLink activeClassName ="active" className="ui button" to ="/dominion"> Dominion </NavLink>
                <NavLink activeClassName ="active" className="ui button" to ="/tutorial"> Tutorial </NavLink>
                <NavLink activeClassName ="active" className="ui button" to ="/welcome"> Welcome </NavLink>
            </div>
        )
    }
}