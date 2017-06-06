import React from "react"
import store from "../../../store" 
import { observer, inject } from "mobx-react"

//so using the provider inject store into props of every componant, I can either do that or I can
//import the store and just call it dirrectly, I'm not sure what the difference is so I'm going to leave
//both examples in place for the time being
@inject ("store") @observer
export default class Title extends React.Component {
    render(){
        // console.log(this.props)
        return (
            <h1>{this.props.title}, {this.props.store.filter_string}, {store.filter_string}</h1>
            // <h1>wHY AM i BROKE?</h1>
        )
    }
}