import React from "react"
import CardComp from "./dominion/CardComp"

export default class Dominion extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <h1>The Dominion Page</h1>
                <CardComp />
            </div>
        )
    }
}