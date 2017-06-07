import React from "react"
import { observer, inject } from "mobx-react"
import { DisplayCard } from "../componants/DisplayCard"

// import { Copper } from "../componants/cards"


@inject("store") @observer
export default class BaseCards extends React.Component {
    //I'm not sure where to use state and where to use an atribute variable
    //sounds like state is for when I want to update a render?
    cards = []
    constructor(props){
        super(props)
        // this.cards= this.props.cards
        // console.log('basecards props is:' , props)
        // console.log("Base cards has this props.cards", this.props.cards )

    }

    // return <div key ={index}>{DisplayCard(pile.cards[0])}</div>;

    render() {
        const { base_cards } = this.props.store.current_game
        let cards_list = base_cards.map((deck , index) =>{
            if(deck.count <=0) {return null}
            // console.log("deck from basecards map",deck, index)
             return <div key ={index} onClick={() => this.props.store.current_game.current_player.buy_card(deck)}>
            {DisplayCard(deck.cards[0])}
            <p>{deck.count}</p>
            </div>;
         })
         return  (
            <div>
                <ul className="basic">{ cards_list }</ul>
            </div>
        )
    }
}