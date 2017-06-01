import React from "react"


export default class Title extends React.Component {
    render(){
        // console.log(this.props)
        return (
            <h1>{this.props.title}</h1>
            // <h1>wHY AM i BROKE?</h1>
        )
    }
}