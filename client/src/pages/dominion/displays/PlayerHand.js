import React from "react"
import { DisplayCard } from "../componants/DisplayCard"
import { observer, inject } from "mobx-react"

@inject("store") @observer
export default class PlayerHand extends React.Component {
    constructor(props){
            super(props)
        }
        
    handleClick(card){
        console.log("you clicked", card)
        console.log("the cards location is", card.curr_location.deck_type)
        //this should only return true if the buy was succesful
        this.props.store.current_game.card_action_handler(card)
   
    }
    
   render() {
        if(!this.props.hand){return null}
        // console.log("when does the player hand render?")
        let cards_list = this.props.hand.cards.map((card , index) => {
        // console.log("deck thinks current player is", store.current_game.current_player)
        return (
            <div key ={index} onClick={() => this.handleClick(card)}>
                {DisplayCard(card)} 
            </div>)
         }) 
        // console.log(cards_list)
        return  (
            <div>
                <ul className="basic">{ cards_list }</ul>
            </div> 
        )     
    }
}