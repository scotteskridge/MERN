import React from "react"
import  PlayerState from "./PlayerState"
import  PlayedCards from "./PlayedCards"
import  PlayerHand from "./PlayerHand"

export default class PlayerDisplay extends React.Component {
    render(){
        return (
            <div>
                <h4>The PlayerDisplay</h4>
                <PlayerState />
                <PlayedCards />
                <PlayerHand />
            </div>
        )
    }
}