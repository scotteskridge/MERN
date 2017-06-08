import React from "react"
import { observer, inject } from "mobx-react"
import { DisplayCard } from "../componants/DisplayCard"
// import { Copper } from "../componants/cards"

@inject("store") @observer
export default class ActionCards extends React.Component {
    //I'm not sure where to use state and where to use an atribute variable
    //sounds like state is for when I want to update a render?
    
    constructor(props){
        super(props)
        // console.log("Actions cards has this props.cards", this.props.cards )

    }

    //I don't like haveing the deck manipulated at this level but I don't know how to off load it into
    //the game's action handler instead becuase everythin is built to accpet cards instead of decks
    handleClick(deck){
        // console.log("you clicked", deck)
        // console.log("the cards location is",deck.cards[0], deck.cards[0].curr_location.deck_type)
        // console.log("are my objects the same?",deck.cards[0]===deck.cards[1] )
        this.props.store.current_game.card_action_handler(deck.cards[0])
     
    }
 //right now each card is assigned an on click event by its display handler
        //however the effect of what happens when you click on a card needs to change
        //based on the current game state... ie.. play when the phase is action, buy when its
        //but etc. in this case the state is discarding and the onclick action needs to be
        //changed so rather than being hard coded in the function that I'm passing into the 
        //onlick needs to be dynamic and be updated based on state
        //ok one way to do this is to make a function inside player with a bunch of switch cases
        //or if checks that then runs a function depending on the game state
    
// () => this.props.store.current_game.current_player.buy_card(deck)
// get_click_handler(card){
//     retrun this.game.clickobject[state](card)
// } ())
    //need some logic in here that if pile count = 0 show a big x instead of a card

    render() {
        const { action_cards } = this.props.store.current_game
        let cards_list = action_cards.map((deck , index) =>{
            if(deck.count <=0) {return null}
            
            // console.log("deck from action cards map",deck, index)
            return <div key ={index} onClick={this.handleClick.bind(this, deck)}>
                        {DisplayCard(deck.cards[0])}
                        <p>{deck.count}</p>
                    </div>;
        })
        
        return  (
            <div >
                <ul className="action">{ cards_list }</ul>

            </div>
        )
    }
}