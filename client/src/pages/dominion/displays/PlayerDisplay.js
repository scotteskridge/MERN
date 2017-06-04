import React from "react"
import  PlayerState from "./PlayerState"
import  PlayedCards from "./PlayedCards"
import  PlayerHand from "./PlayerHand"

export default class PlayerDisplay extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h4>The PlayerDisplay</h4>
                <PlayerState player = {this.props.player} />
                <PlayedCards played = {this.props.player.played} />
                <PlayerHand hand = {this.props.player.hand} />
            </div>
        )
    }
}