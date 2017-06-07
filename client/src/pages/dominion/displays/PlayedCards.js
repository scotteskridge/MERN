import React from "react"
import { DisplayCard } from "../componants/DisplayCard"
import { observer, inject } from "mobx-react"

@inject("store") @observer
export default class PlayedCards extends React.Component {
    
    constructor(props){
            super(props)
        }

    render() {
        if(!this.props.played){return null}
        let cards_list = this.props.played.cards.map((card , index) => {
            // console.log("deck thinks current player is", store.current_game.current_player)
            return (
                <div key ={index} >
                    {DisplayCard(card)} 
                </div>)
             }) 
        return  (
            <div>
                <ul className="basic">{ cards_list }</ul>
            </div>

            )
          
    }
}

