import React from "react"
import { DisplayCard  }  from "./dominion/componants/DisplayCard"
import { Deck } from "./dominion/componants/DeckClass"
import { AllCards } from "./dominion/componants/cards.js"
import { Game } from "./dominion/componants/GameClass.js"
import GameState from "./dominion/displays/GameState"
import BaseCards from "./dominion/displays/BaseCards"
import ActionCards from "./dominion/displays/ActionCards"
import PlayerDisplay from "./dominion/displays/PlayerDisplay"
// let cards = require("./cards.js")



export default class Dominion extends React.Component {
    num_of_players
    // INIT_STATE = ['card_list', 'baseCards', 'actionCards']
    
    
    constructor(props){
        super(props)
        this.AllCards = new AllCards // I'm not sure why I actually needed to instantiate a new instance but it worked
        this.game = new Game //this may need to go into state?
        this.onClick = this.handleClick.bind(this);
        console.log("the state is:", this.state)
        this.state = {
            card_list: [],
            now : new Date(),
            baseCards: [],
            actionCards: [],
            game : new Game
        }


    }
    checkState(event){
        console.log("the state is:", this.state)
    }
    
    next_player(){
        this.game.next_player()
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
        this.start_new_game()
        // this.render()
    }

    start_new_game(){
        this.AllCards = new AllCards
        this.game = new Game
        this.game.setupPlayers() //setting players gives them starting hand as well
        
        this.assign_baseCards()
        this.choose_actions()
        this.game.initGame()
        this.setState({game : this.game}, () => console.log("after set state the state is:", this.state))
               
    }

    //I got rid of choose actions and assign actions and combined to one.
    //may need to break them apart again to allow for game update
    choose_actions(){
        let allActions = new Deck()
        
        for (let cardClass of this.AllCards.AllActions) {
            allActions.cards.push(new cardClass)
        }
       
        allActions.shuffle()
        console.log("num of cards is",this.game.numActionCards)
        allActions.cards.length = this.game.numActionCards
        this.setState({actionCards : allActions.cards })
    // setState((previousState, currentProps) => {
    //     console.log(previousState, currentProps)
    //       return {counter: previousState.counter + 1};
    //   });

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
    let baseCards = []    
    for (let card of this.AllCards.BaseCards){
        baseCards.push(new card)
    }
    
    this.setState({baseCards : baseCards })
    // this.state.baseCards = baseCards

}







//for right now the game is going to be hot seat so the Player display needs to be given
//the active players hand and played cards... going forward it will only need the 
//logged in player and I'll use sockets for each active player

    render(){
        return (
            <div>
                <h1>The Dominion Page</h1>
                <h2>It is {this.state.now.toLocaleTimeString()}.</h2>
                <button className="ui button" onClick={this.checkState.bind(this)}>Check State </button>
                <button className="ui button" id={this.props.id} onClick={this.onClick}>New Game </button>
                <button className="ui button" onClick={this.next_player.bind(this)}>Next Player </button>

                <GameState game = {this.state.game}/>
               
                <BaseCards cards = {this.state.baseCards}/>
                <ActionCards cards = {this.state.actionCards}/>
                <PlayerDisplay player = {this.state.game.current_player} /> 
                
            </div>
        )
    }
}


if (require.main === module){
    console.log("this is main")
}