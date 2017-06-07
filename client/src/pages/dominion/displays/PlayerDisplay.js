import React from "react"
import { observer, inject } from "mobx-react"
import  PlayerStats from "./PlayerStats"
import  PlayedCards from "./PlayedCards"
import  PlayerHand from "./PlayerHand"

@inject("store") @observer
export default class PlayerDisplay extends React.Component {
    

    //ideally I'd like this button to have several states and change it's text based on the state
    //really the button just needs to show pass and end turn do i need state for the button text?
    next_phase(){
        //moving all logic to gameclass side
       const { current_game } = this.props.store
        //// END ACTION PHASE //// 
       if(current_game.current_phase == "Action"){
        current_game.end_action()
            return 
         //// END BUY PHASE ////
        } else if(current_game.current_phase == "Buy"){
            current_game.end_buy()
        }
    }
    render(){
        const { current_player } = this.props.store.current_game
        const play_card = (card) => {current_player.play_card(card)}
        return (
            <div>
                <p>{current_player.feedback}</p>
                <button className="ui button" onClick={this.next_phase.bind(this)}>{current_player.button_text} </button>

                <PlayerStats player = {current_player} />
                <h3>Played Cards</h3>
                <PlayedCards played = {current_player.played}/>
                <h3>{current_player.name}'s Hand</h3>
                <PlayerHand hand= {current_player.hand} />
            </div>
        )
    }
}