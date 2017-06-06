import React from "react"
import { observer, inject } from "mobx-react"
import { DisplayCard  }  from "./dominion/componants/DisplayCard"
import { Deck } from "./dominion/classes/DeckClass"
import { AllCards } from "./dominion/classes/AllCards"
import { Game } from "./dominion/classes/GameClass"
import GameState from "./dominion/displays/GameState"
import BaseCards from "./dominion/displays/BaseCards"
import ActionCards from "./dominion/displays/ActionCards"
import PlayerDisplay from "./dominion/displays/PlayerDisplay"
import store from "../store"
// let cards = require("./cards.js")

//its important to inject and then pull out of props.store to avoid
//2 way data binding clashes
@inject("store") @observer
export default class Dominion extends React.Component {
    num_of_players
    // INIT_STATE = ['card_list', 'baseCards', 'actionCards']
    
    
    constructor(props){
        super(props)
        // this.AllCards = new AllCards // I'm not sure why I actually needed to instantiate a new instance but it worked
        // this.game = new Game //this may need to go into state?
        this.onClick = this.handleClick.bind(this);
        // console.log("the store is:", store)
        this.state = {
          now : new Date(),
        }
    }
    checkState(event){
        console.log("the state is:", this.state)
    }
    
    next_player(){
        this.game.next_player()
    }
    save_game(game){
        store.save_game(game)
        
    }


    componentDidMount(){
    this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            now: new Date()
        });
     }
     //be aware the setState({object to update}, callBack to run aftwards) has abuilt in .then call back with
     //no response 
    
    handleChange(event){
        console.log("was there an event?", event)
    }
    handleClick(event) {
        // const id = event.target
        // console.log("the id is:", id, event)
        store.current_game.start_new_game()
        // this.render()
    }



    //I got rid of choose actions and assign actions and combined to one.
    //may need to break them apart again to allow for game update
    
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

 change_name(event){
    this.props.store.current_game.current_player.name = event.target.value
  }









//for right now the game is going to be hot seat so the Player display needs to be given
//the active players hand and played cards... going forward it will only need the 
//logged in player and I'll use sockets for each active player

    render(){
        const { current_game } = this.props.store
        return (
            <div>
                <h1>The Dominion Page</h1>
                <h2>It is {this.state.now.toLocaleTimeString()}.</h2>
                <button className="ui button" onClick={store.game_status.bind(this)}>Check GameStore </button>
                <button className="ui button" onClick={store.new_game.bind(this)}>New Game </button>
                <button className="ui button" onClick={this.save_game.bind(this, current_game)}>Save Game </button>
                <button className="ui button" onClick={this.next_player.bind(this)}>Next Player </button>

                <GameState game = {current_game}/>
               
                <BaseCards cards = {current_game.base_cards}/>
                <ActionCards cards = {store.current_game.chosen_actions.cards}/>
                <PlayerDisplay  /> 

                <input className = "current_player_name" value = {current_game.current_player.name} onChange={this.change_name.bind(this)} />
                {current_game.current_player.name}
            </div>
        )
    }
}


if (require.main === module){
    console.log("this is main")
}