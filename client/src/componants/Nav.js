import React from "react"
import { Link, NavLink} from "react-router-dom"

export default class Nav extends React.Component {
    constructor(){
        super()
    }
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