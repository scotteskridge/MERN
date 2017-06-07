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
  @observable phase = ["Action" , "Buy" , "Cleanup"]
  @observable current_phase = ""
  @observable numActionCards = 10 //this may change based on number of players
  // @observable AllCards = new AllCards
  @observable base_cards = new Deck 
  @observable chosen_actions = new Deck()

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
    this.phase = ["Action" , "Buy" , "Cleanup"]
    this.current_phase = ""
    this.numActionCards = 10 //this may change based on number of players
    this.AllCards = new AllCards
    this.base_cards = [] //needs to be an array of decks
    this.action_cards = []
    this.chosen_actions = [] //needs to be an array of decks

    // console.log("created a new game object")
    // console.log(this.allCards)
    // this.start_new_game()
  }

//////////////// INIT METHODS ///////////////////////////
  start_new_game(){
    // console.log("starting a new game")
    // this.allCards = new AllCards
    this.setupPlayers() 
    this.initGame() //needs to be before choose_actions to get the right num of piles
    
    this.assign_base_cards()
    this.choose_actions()
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
    for (let card of this.AllCards.BaseCards){
      let thiscard = new card
      let pile = new Deck
      for(let i=0; i < thiscard.pile_count; i++){
        pile.add_to(new card)
      }
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
      let thiscard = new card
      let pile = new Deck
      for(let i=0; i < thiscard.pile_count; i++){
        pile.add_to(new card)
      }
      this.action_cards.push(pile)
      // console.log("from choose actions the action_cards are", this.action_cards)
    }
  }

  
  //////////////// ACTION PHASE METHODS ///////////////////////////
  @action end_action(){
    this.current_player.play_treasures()
    this.current_player.button_text="End Turn"
    this.current_player.feedback = "Select a card to buy"
    this.current_phase = "Buy"
  }
  //////////////// BUY PHASE METHODS ///////////////////////////
  @action end_buy(){
    //Change feeback to be ready for next turn
    this.current_player.feedback = "Select a card to play" 
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



