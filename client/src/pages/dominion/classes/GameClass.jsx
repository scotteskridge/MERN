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


export class Game {
  @observable current_player = new Player
  @observable game_over = false
  @observable initialize = false
  @observable players = []
  @observable score_tally = []
  @observable num_of_players = 0
  @observable player_num = 0
  @observable current_player = new Player
  @observable turn = 0 //may wan this for a time machine
  @observable phase = ["Action" , "Buy" , "Cleanup"]
  @observable current_phase = ""
  @observable numActionCards = 10 //this may change based on number of players
  @observable AllCards = new AllCards
  @observable base_cards = []  
  @observable chosen_actions = new Deck()

  constructor(){
    this.game_over = false
    this.initialize = false
    this.players = []
    this.score_tally = []
    this.num_of_players = 0
    this.player_num = 0
    this.current_player = new Player
    this.turn = 0 //may wan this for a time machine
    this.phase = ["Action" , "Buy" , "Cleanup"]
    this.current_phase = ""
    this.numActionCards = 10 //this may change based on number of players
    this.AllCards = new AllCards
    this.base_cards = []  
    this.chosen_actions = new Deck()

    // console.log("created a new game object")
    // console.log(this.allCards)
    // this.start_new_game()
  }

  start_new_game(){
    // console.log("starting a new game")
    // this.allCards = new AllCards
    this.setupPlayers() 
    
    this.assign_base_cards()
    this.choose_actions()
    this.initGame()
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
    }
    this.current_player = this.players[0]
    this.current_phase = this.phase[0]
    this.update_score()
    
  }
  
  next_player(){
    // console.log("about to next player", this)
    this.player_num +=1
    if (this.player_num == this.players.length){
      this.player_num = 0
    }
    this.current_player = this.players[this.player_num]
    this.current_player.draw_hand()
    // this.update_score()
    return this.player_num
  }

  update_score(){
    this.score_tally = []
    for (let player of this.players){
      this.score_tally.push({player : player.name, score : player.tally_score() })
    }
    return this.score_tally
  }

  assign_base_cards(){
    this.base_cards = []    
    for (let card of this.AllCards.base_cards){
        this.base_cards.push(new card)
    }  
}

  choose_actions(){
        this.chosen_actions = new Deck()
        
        for (let cardClass of this.AllCards.AllActions) {
            this.chosen_actions.cards.push(new cardClass)
        }
       
        this.chosen_actions.shuffle()
        this.chosen_actions.cards.length = this.numActionCards
}

  check_end_game(){
    console.log("counting up all of the piles to see if game is over")
  }







} // end of game class



// if (!game_over){
//   console.log("Game Over the winner is Scott")
// }



// function next_phase(){
//   current_phase +=1
//   if (current_phase == phase.length){
//     current_phase = 0
//   }
//   return current_phase
// }
// let turn_counter = 0
// function action_phase(){
//   console.log("It's the action phase")
//   next_phase()
// }
// function buy_phase(){
//   console.log("It's the buy phase")
//   next_phase()
// }
// function cleanup_phase(){
//   console.log("It's the cleanup phase")
//   next_phase()
//   next_player()
//   turn_counter += 1
//   if (turn_counter > 4){
//     game_over = true
//   }
// }
// function update_score(){
//   for (let player of players){
//     player.tally_score()
//     let list_item = (`<li>${player.name}'s score: ${player.score}</li>`)
//     $('#score_board').append(list_item)
//   }
// }
// function display_winner(){
//   let winner = current_player;
//   for (let player of players){
//     if (player.score > winner.score){
//       winner = player
//     }
//   }
//   alert(`${winner.name} is the winner!`)
// }










// $(document).ready(function(){
//   build_board()

//   //initialize the game state
//   if (initialize){
//     //create new players on game start
//     num_of_players = prompt("Please enter the number of new players:")
//     for (let i = 0; i < num_of_players; i++){
//       let name = prompt("Please enter the players name:")
//       let player = new Player(name)
//       players.push(player)
//     }
//     //populate the html
//     current_player = players[player_num]
//     $('#current_player').html(current_player.name)
//     $('#current_phase').html(phase[current_phase])
//     $('#deck_count').html(current_player.deck.length)
//     $('#discard_count').html(current_player.discard.length)
//     $('#actions').html(current_player.actions)
//     $('#buys').html(current_player.buys)
//     $('#coins').html(current_player.coins)
//     update_score()
//     current_player.draw_hand()
//     current_player.display_hand()

//   }
//   else {
//     //this is purely for debugging
//     num_of_players = 4
//     for (let i = 0; i < num_of_players; i++){
//       let name = `player${i}`
//       let player = new Player(name)
//       players.push(player)
//     }
//     current_player = players[player_num]
//     $('#current_player').html(current_player.name)
//     $('#current_phase').html(phase[current_phase])
//     $('#deck_count').html(current_player.deck.length)
//     $('#discard_count').html(current_player.discard.length)
//     $('#actions').html(current_player.actions)
//     $('#buys').html(current_player.buys)
//     $('#coins').html(current_player.coins)
//     update_score()
//     current_player.draw_hand()
//     current_player.display_hand()
//   }

//   //stay in game loop until game_over is true
// while (!game_over){
//   action_phase()
//   buy_phase()
//   cleanup_phase()
// }
// update_score()
// display_winner()

//   //advance phase
//   $('#next_phase').click(function(){
//     next_phase()
//     $('#current_phase').html(phase[current_phase])
//   })

//   //once game_over is true tally score and display winner

//   // display players turn
//   $('#current_player').click(function(){
//     next_player()
//     $('#current_player').html(current_player.name)
//   });

//   //count donw cards as you buy from piles
//   let card_count = 10;
//   let countDisplay = $('.coppers')
//   let clickme = $('.click')
//   clickme.click(function(){
//     card_count -= 1;
//     countDisplay.html(card_count)

//   $('.card').click(function(){
//     console.log($(this))
//   });
//   });
// });
