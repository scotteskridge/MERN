import React from "react"
import { DisplayCard  }  from "./dominion/componants/DisplayCard"
import { Deck } from "./dominion/DeckClass"
import { Village, Cellar, Chapel, Moat, Chancellor, Woodcutter, Workshop, Feast,
        Militia, Witch, Moneylender, Smithy, Throneroom, Festival, Laboratory,
        Copper, Silver, Gold, Estate, Duchy, Province, Curse } from "./dominion/componants/cards.js"
import GameState from "./dominion/displays/GameState"
import BaseCards from "./dominion/displays/BaseCards"
import ActionCards from "./dominion/displays/ActionCards"
import PlayerDisplay from "./dominion/displays/PlayerDisplay"
// let cards = require("./cards.js")



export default class Dominion extends React.Component {
    // allActions = []
    card_list = []
    baseCards = []
    actionCards = []
    aCopper = new Copper()
    numActionCards = 10
    AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                        Woodcutter, Workshop, Feast, Militia, Witch, 
                        Moneylender, Smithy, Throneroom, Festival, Laboratory]

    constructor(props){
        super(props)
        this.build_board()
        // console.log("props is: ", props)
        // console.log("state is: ", this.state)
    
    }

    build_board(){
        this.assign_baseCards()
        this.choose_actions()
    }

    // make_card(cardname){
    //     return new cardname
    // }

    choose_actions(){
        let allActions = new Deck()
        for (let cardClass of this.AllActions) {
            allActions.cards.push(new cardClass)
        }
        // for (var card of list){
        //   action_list.cards.push(make_card(card))
        // }
        allActions.shuffle()
        for(let i=0; i<this.numActionCards; i++ ){
            this.actionCards.push(allActions.cards[i])
        }
    

}
// assign_action(){
//   this.actionCards = this.choose_actions()
//   for (var card of this.actionCards){
//     // var test_pile = new Deck(make_card(card_list[ind]))
//     // console.log(test_pile, test_pile.cards.length)
//     // $('.action').append(display_pile(card))
//   }



    display_pile(card){
  return `<div class="click " >
            <ul class = "card">
              <li>Name: ${card.Name}</li>
              <li>Cost: ${card.Cost}</li>
              <li>Victory Points : ${card.Victory_Points}</li>
              <li>Type: ${card.Type}</li>
              <li>Description: ${card.Description}</li>
            </ul>
            <span class = "counter">
              ${card.PileCount()}
            </span>
          </div>`
}

assign_baseCards(){
  
    this.baseCards.push(new Copper)
    this.baseCards.push(new Silver)
    this.baseCards.push(new Gold)
    this.baseCards.push(new Estate)
    this.baseCards.push(new Duchy)
    this.baseCards.push(new Province)
    this.baseCards.push(new Curse)

}



village = new Village





    render(){
        return (
            <div>
                <h1>The Dominion Page</h1>
               
                <GameState />
                <BaseCards cards = {this.baseCards}/>
                <ActionCards cards = {this.actionCards}/>
                <PlayerDisplay /> 
                
            </div>
        )
    }
}