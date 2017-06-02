import React from "react"

export default class Welcome extends React.Component {
    constructor(props){
        super(props)
        console.log("so my constructor isn't useless")
    }
    render(){
        return (
            <h1>The Welcome Page</h1>
        )
    }
}