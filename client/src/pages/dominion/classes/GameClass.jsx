// not sure if this game object should have state or not
//my initial reaction is not but that I should tie it's value to the dominion controllers state
//so I think I'll make a gameState atribute and a function that can map that game state to the 
//controllers state... this game should also look a little bit like something that can be saved into
//a database so that I can have different instances of game._ID and updatedAt / createdAt
//

//I think i'm going to move all of the things to do with making a new game into here
import { Player } from "./PlayerClass"
import { AllCards } from "./AllCards.js"
import { Deck } from "./DeckClass"
import { Card } from "./AllCards"
import { autorun, observable, computed, action } from "mobx"

//i need a way to tie cards to piles and piles need a pile count... does this actually need
//to be n seperate instances of a card stored in an array? or can I simply track the remain cards seperatly
// it will be simpler to use the deck class even though piles could be simpler


export class Game {
  @observable current_player = new Player
  @observable game_over = false
  @observable num_piles_to_end = 3
  @observable initialize = false
  @observable players = []
  @observable score_tally = []
  @observable num_of_players = 0
  @observable player_num = 0
  @observable current_player = new Player
  @observable turn = 0 //may want this for a time machine
  @observable current_phase = ""
  @observable phase = ["Action", "Buy", "Cleanup"]
  @observable numActionCards = 10 //this may change based on number of players
  // @observable AllCards = new AllCards
  @observable base_cards = new Deck() 
  @observable chosen_actions = new Deck()
  @observable events
  @observable card_to_resolve


  constructor(){
    this.game_over = false
    this.num_piles_to_end = 3 //this is here to accomodate more than 4 players
    this.initialize = false
    this.players = []
    this.score_tally = []
    this.num_of_players = 0
    this.player_num = 0
    this.current_player = new Player
    this.turn = 0 //mayt wan this for a time machine
    this.current_phase = ""
    this.phase = ["Action", "Buy", "Cleanup"]
    this.numActionCards = 10 //this may change based on number of players
    this.AllCards = new AllCards
    this.base_cards = [] //needs to be an array of decks
    this.action_cards = []
    this.chosen_actions = [] //needs to be an array of decks
    this.trash = new Deck(null, "trash")
    this.card_to_resolve = {}
    this.events = {
      "Action" : (card) =>{
         if(card.curr_location.deck_type !== "hand") {return this.current_player.message.Action = "please select a card from your hand"}
        this.current_player.play_card(card)
      },
      "Buy" : (card) => {
        if(card.curr_location.deck_type !== "store") {return this.current_player.message.Buy = "please select a card from the store"}
        this.current_player.buy_card(card)
      },
      //this one needs to get moved to "Resolve and shove everything under the cellar"
      "Show" : (card) => {
        this.current_player.show_card(card)
      },
      "Playing" : (card) => {console.log("Handler resolve hasn't been overwritten")},
      "Resolve" : (card) => {console.log("Handler resolve hasn't been overwritten")},
      
    }

  }
    @action card_action_handler(card){
    return (this.events[this.current_phase])(card)
    // 
    //i need to set this up to either only accept decks or cards i think,
    //when playing from hand I'm clicking on cards
    //when buying a card i'm clicking on decks
    //does it matter? if this think is only routing the input to 
    //some mapped output the type of the input can change right?
    //buy - deck
    //play - card
    //trash - card
    //discard - card
    //show - card
    //ok so really the problem is that buying is buying a card but is affecting the count of the deck
    //alright this jusy needs to pass around cards and I'll fix the buy method to accpet cards
    //I think cards are goingto need to validate their own location so that I can check if it's ok to buy them or play them
     

    // return this.action_phase_map[this.current_phase](card)
    
  }

//////////////// INIT METHODS ///////////////////////////
  start_new_game(){
    // console.log("starting a new game")
    // this.allCards = new AllCards
    this.setupPlayers() 
    this.initGame() //needs to be before choose_actions to get the right num of piles
    
    this.assign_base_cards()
    this.choose_actions()
    console.log(this)
    // this.save_game(this.game)
            
}

  setupPlayers(){
    // console.log("setting up players")
    this.players = []
    //this breaks if you cancle out of the prompt, when i transition to a pretty modal
    //make sure I have a pretty fail case as well
    //create new players on game start
    //not sure what happens if I call prompt from inside this class it should work
    //later on I'm going to need to have a modal pop up so this may need to call a componant
    //or be passed players from a componant
    this.num_of_players = parseInt(prompt("Please enter the number of new players:"))
    if(this.num_of_players !=0){
      for (let i = 0; i < this.num_of_players; i++){
        let name = prompt("Please enter the players name:")
        let player = new Player(name)
        player.draw_hand()
        this.players.push(player)    
      }

    }
  }
  initGame(){
    if (this.num_of_players > 4){
      this.numActionCards = 6 + this.num_of_players
      this.num_piles_to_end = this.num_of_players -1
    }
    this.current_player = this.players[0]
    this.current_phase = this.phase[0]
    this.num_piles_to_end
    this.update_score()
    
  }
  assign_base_cards(){
    // this.base_cards = [] 
    // this.AllCards = new AllCards
    // could do some funny business with makeing the cards location be "pile"
    // and makeing the curr_location
    for (let card of this.AllCards.BaseCards){
      let pile = new Deck(card, "store")
      // for(let i=0; i < thiscard.pile_count; i++){
      //   // let aCard = new card
      //   // aCard.curr_location = pile
      //   pile.add_to(new card)
        
      // }
      this.base_cards.push(pile)
    }
    // console.log("turning base cards into an array of piles",this.base_cards)  
  }
  choose_actions(){
    this.chosen_actions = new Deck()
    for (let cardClass of this.AllCards.AllActions) {
        this.chosen_actions.add_to(cardClass)
    }   
    this.chosen_actions.shuffle()
    this.chosen_actions.cards.length = this.numActionCards
    // console.log("from choose actions the chosen_actions are", this.chosen_actions)
    for (let card of this.chosen_actions.cards){
      // let thiscard = new card
      let pile = new Deck(card, "store")
      // for(let i=0; i < thiscard.pile_count; i++){
      //   pile.add_to(new card)
      // }
      this.action_cards.push(pile)
      // console.log("from choose actions the action_cards are", this.action_cards)
    }
  }


  
  //////////////// ACTION PHASE METHODS ///////////////////////////

  @action end_action(){
    this.current_player.play_treasures()
    // this.current_player.message = "Select a card to buy"
    this.current_phase = "Buy"
  }
  //////////////// BUY PHASE METHODS ///////////////////////////
  @action end_buy(){
    //Change feeback to be ready for next turn
    // this.current_player.message = "Select a card to play" 
    this.current_phase = "Cleanup"
    this.current_player.end_turn()
    this.cleanup()
  }

  //////////////// CLEANUP PHASE METHODS ///////////////////////////
  //current player discards everything
  //update score
  //check for end game condition ie emptypiles
  //start next players turn
  //this is everything that should happen during cleanup

  @action cleanup(){
    this.check_end_game()
    this.update_score()
    this.current_phase = "Action"
    this.next_player()
    this.turn += 1
  }

  check_end_game(){
    //ok I could likely keep a running total of empty decks and subscribe to it 
    //and then end the game at that point but for the time being I'm just going to do
    //a recount every cleanup
    console.log("counting up all of the piles to see if game is over")
    if(this.num_piles_to_end <=0 ){
      this.update_score()
      let winner = {score: 0, player: new Player}
      for(let player of this.players){
        if(player.score >= winner.score){
          winner.score = player.score
          winner.player = player
        }
      }
      alert(`${winner.player.name} Won the game with ${winner.score} points!`)
    }
    // let emptypiles = this.num_piles_to_end
    // for(let deck of base_cards){
    //   if(deck.count <= 0){
    //     emptypiles -=1
    //   }
    
    // }
  
  }

  update_score(){
    this.score_tally = []
    for (let player of this.players){
      this.score_tally.push({player : player.name, score : player.tally_score() })
    }
    return this.score_tally
  }
  next_player(){
    // console.log("about to next player", this)
    this.player_num +=1
    if (this.player_num == this.players.length){
      this.player_num = 0
    }
    this.current_player = this.players[this.player_num]
    // this.update_score()
    return this.player_num
  }




} // end of game class





