import React from "react"
import { observer, inject } from "mobx-react"
import  PlayerState from "./PlayerState"
import  PlayedCards from "./PlayedCards"
import  PlayerHand from "./PlayerHand"

@inject("store") @observer
export default class PlayerDisplay extends React.Component {

    end_turn(){
        //this is everything that should happen during cleanup
        //current player discards everything
        //update score
        //check for end game condition ie emptypiles
        //start next players turn

        this.props.store.current_game.current_player.end_turn()
        this.props.store.current_game.update_score()
        this.props.store.current_game.check_end_game()
        this.props.store.current_game.next_player()
    }
    render(){
        const { current_player } = this.props.store.current_game
        const play_card = (card) => {current_player.play_card(card)}
        return (
            <div>
                <button className="ui button" onClick={this.end_turn.bind(this)}>End Turn </button>
                <PlayerState player = {current_player} />
                <PlayedCards played = {current_player.played}/>
                <PlayerHand hand= {current_player.hand} />
            </div>
        )
    }
}