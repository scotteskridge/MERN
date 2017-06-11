import { observable, computed, action  } from "mobx"
import { autorun } from "mobx-react"
import  store  from "../../../store"


//I could do the same thing here that i did with player
//rather than having type as a string I should likely have type as an
//interface then only cards that are of type victory need to have an atribute
//of victory_points
//all of these arributes really should be lower case
export class Card{
  @observable curr_location = ""
  constructor(game, owner){

   this.cost = 0
  //  this.victory_points = 0 // had to change this to accomodate the gardens
   this.type ="" // Action, Victory, Action  Attack, Action Reaction, Treasure/// Useing type.include("Type") allows cards to be of multiple types ... maybe this should be4 changed to an interface?
   this.name = this.constructor.name //would love this to just be name = CardClassName
  //  this.Ability //This might need to be an object with methods?
   this.more_actions=0
   this.buys=0
   this.coins = 0
   this.draws=0
   this.description=""
   this.curr_location = "pile"
   this.game = game
   this.owner = owner
  }

  //so when a card is played the player removes it from hand puts it on the board
  //and pushes it onto the stack ... changed this so the player does the pushing onto the stack
  //it doesnt actually do anything until it comes off of the stack, and nothing
  //comes off the stack until we check for it to happen
  //the game needs to control when cards come off the stack
  //the first time it get triggered is immediatly after the playcard event
  //controled by the event controler
  //when it comes off the stack it updates the players stats and then resolves
  //any on_play effect.. as soon as its done wiht it's effect it returns to the begining
  //of the aciton phase the action pahse is in charge of setting the phase to action
  //the card is in charge of setting the phase to playing the resolve stack loop needs
  //to only continue if the phase is action
  @action on_play(player = this.owner){
    //this would be a great place to add to current_game.log when I make one
    //ive gotten tangled up with on play vs resolve vs trigger vs starting the action phase so regaurdless of what my code currently says heres what the order of operations needs to be
    //start the turn 
    //set phase to action
    //wait for player to play a card
    //select card and put it on the stack
    //the card does nothing until it comes off the stack
    //after selection resolve the top card of the stack
    //after resolve is finished check if there is more on the stack
    //part of the problem is the on_play isnt causeing the game to wait
    //its only changing the effect of what clicking on a card does
    player.message.Action = ( `${player.name}, played a ${this.name}. `+ "\n").concat(player.message.Action) //not sure why this is getting overwritten
    this.game.current_phase = "Action"
    this.game.check_stack()
    return this

  }

  @action resolve(player = this.owner){
    this.update_stats(player)
    this.on_play(player)
    return null //I think this should return to action phase
  }
  @action update_stats(player){
    player.actions += this.more_actions
    player.buys += this.buys
    player.coins += this.coins
    for(let i =0; i < this.draws; i++){
      player.draw()
    }
    return
  }
}

// import Copper from '../../../static/assets/Copper.jpg' //not sure why this doesnt work
//may want to add an img atribute take a look at header on how to import those

//useing the .includes() on the action string allows the type to have multiple types!



export class AllCards{
  @observable AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                Woodcutter, Workshop, Feast, Militia, Witch, 
                Moneylender, Smithy, Throneroom, Festival,
                Laboratory]
  @observable base_cards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
  constructor(){

    this.AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                Woodcutter, Workshop, Feast, Militia, Witch, 
                Moneylender, Smithy, Throneroom, Festival,
                Laboratory, Market, Bureaucrat, Remodel, CouncilRoom,
                Mine, Gardens, Library, Adventurer] 
    this.BaseCards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
    // console.log("from thr all cards constructor gamebase cards is", this.BaseCards)
  }
} 

export class Copper extends Card {
  constructor(game, owner){
    super(game, owner)
    this.type = "Treasure"
    this.victory_points = 0
    this.coins = 1
    this.description = `A ${this.name} gives ${this.coins} coins`
    this.pile_count = 60 
    
   }
  // on_play(player){
  //   super.on_play(player)
  //   console.log(player)
  // }
}

export class Silver extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.victory_points = 0
    this.type = "Treasure"
    this.more_actions = 0
    this.buys = 0
    this.coins = 2
    this.draws = 0
    this.description = `A ${this.name} has a buying value of 2`
    this.pile_count = 40 
    }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}

export class Gold extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 6
    this.victory_points = 0
    this.type = "Treasure"
    this.more_actions = 0
    this.buys = 0
    this.coins = 3
    this.draws = 0
    this.description = `A ${this.name} has a buying value of 3`
    this.pile_count = 30 
    }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}

export class Estate extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.victory_points = 1
    this.type = "Victory"
    this.more_actions = 0
    this.buys = 0
    this.coins = 0
    this.draws = 0
    this.description = `An ${this.name} is worth 1 Victory Point`
    this.pile_count = 24 
  }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}

export class Duchy extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 3
    this.type = "Victory"
    this.more_actions = 0
    this.buys = 0
    this.coins = 0
    this.draws = 0
    this.description = `A ${this.name} is worth 3 Victory Points`
    this.pile_count = 12 
  }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}

export class Province extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 8
    this.victory_points = 6
    this.type = "Victory"
    this.more_actions = 0
    this.buys = 0
    this.coins = 0
    this.draws = 0
    this.description = `A ${this.name} is worth 6 Victory Points`
    this.pile_count = 12 
  }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}
export class Curse extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 0
    this.victory_points = -1
    this.type = "Victory"
    this.more_actions = 0
    this.buys = 0
    this.coins = 0
    this.draws = 0
    this.description = `A ${this.name} subtracts 1 from your final score`
    this.pile_count = 24 // might be fun to do somethign with this similar to the garden and make it's pile count dynamic based on players in the game 
  }
  on_play(player){
    super.on_play(player)
    // console.log(player)
  }
}

//pretty sure my cellar is broken right now needto fix this after stack is fully functional

//ok my celler doesn't work with my concept of how the rest of the cards trigger
//mostly becuase it triggers twice once to effect the button and the a second
//time to redraw I could leave it on the stack until it redraws? I could enque a 
//resolve object? Ok the cellar is hurting my brain I'm going to leave this one and come back to it
//ok I actually think I need a second stack of card effects for delayed effects
export class Cellar extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 1
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.redraws = 0
    this.description = `the ${this.name} let's you discard cards to redraw`
  }
  on_play(player){
    this.game.event_stack.push(this)
    // console.log(player)
    this.game.current_phase = "Playing"
    player.message.Playing = "Choose a card to discard or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {
        return this.current_player.message.Playing = "please select a card from your hand to discard"
      }
      player.discard_card(card)
      this.redraws++
    }
  }
  event(player){
    while(this.redraws >0){
      player.draw()
      this.redraws--
    }
    //do i need to set the phase back to Action?
  }
}



export class Chapel extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.trash = 4
    this.description = `A ${this.name} let's you trash upto 4 cards from your hand`
  }
  on_play(player){
    // super.update_stats(player) // do you update stats before or after resolveing effect? not sure
    //would probably be a good idea to have an obj/arr to push these into and on clicking confirm trash all of them, that would allow to have a modal of selected cards tos cancle and confirm this would then look a lot like the celler with a confirm action that would trigger the rest of the cards action
    //which really mean that cards need an off the stack phase and a resolve phase
    //does that mean that I need to keep track of a played_stack and a resolve effect stack? 
    //go through the array and trash all of them but one problem at a time
    this.trash = 4 // this resets it on play ... it does mean that the trashes available are wrong while its in my discard
    player.message.Playing = "Choose up to four cards to trash or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {return this.current_player.Playing = "please select a card from your hand to trash"}
      player.trash_card(card)
      this.trash--
      
      if(this.trash <=0){
        // this.game.current_phase = "Action"
        this.trash = 4
        super.on_play(player)
        return
      }
    
    }
    
  }
  // resolve(player){
  //   super.resolve(player)
 
  
  // } 
}

export class Moat extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.victory_points = 0
    this.type = "Reaction Action"
    this.more_actions = 0
    this.buys = 0
    this.coins = 0
    this.draws = 2
    this.description = `A ${this.name} protects you from attacks`
    this.pile_count = 10 
  }
  // on_play(player){
  //   super.on_play(player)
  //   // console.log(player)
  //   return
  // }
  OnShow(card){
    console.log("You showed the moat",card)
    return
  }
}

export class Chancellor extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.victory_points = 0
    this.type = "Reaction Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count =10   
    this.coins = 2
    this.draws = 0
    this.description = `The ${this.name} puts your Deck into your discard pile`
    }
  on_play(player){
    for(let card of player.deck.cards){
      player.discard_card(card)
    }
    super.on_play(player)
  }
}
export class Village extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 2
    this.buys = 0
    this.coins = 0
    this.draws = 1
    this.description = `The ${this.name} gives 2 actions and 1 draw`
    this.pile_count = 10 
  }
  //ok so this is only nessasary if I'm overwriting the Cards methods
  // on_play(player){
  //   super.on_play(player)
  //   console.log("and this is in the village I'm expecting it to trigger second")

  // }
  // resolve(player){
  //   // console.log("before the card resolve inside village", player)
  //   super.resolve(player)
  //   // console.log("after the card resolve inside village", player)
  // }
}
export class Woodcutter extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 1
    this.pile_count = 10 
    this.coins = 2
    this.draws = 0
    this.description = `The ${this.name} gives you another buy`
  }
  // on_play(player){
  //   super.on_play(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Workshop extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10
    this.coins = 0
    this.draws = 0
    this.description = `The ${this.name} let's you gain a card upto cost 4`
    }
  on_play(player){
    player.message.Playing = "Gain a card costing up to 4 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 4) {return player.message.Playing = "Card must cost 4 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)

    super.on_play(player)
    }
  }
  //   resolve(player){
  //   // console.log("before the card resolve inside village", player)
  //   super.resolve(player)
  //   // console.log("after the card resolve inside village", player)
  // }
}

export class Feast extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count =10
    this.coins = 2
    this.draws = 0
    this.description = `The ${this.name} trashes it's self to gain a card upto 5 cost`
    }
  on_play(player){
    super.on_play(player)
    player.message.Playing = "Gain a card costing up to 5 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 5) {return player.message.Playing = "Card must cost 5 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)
      player.trash_card(this)
      super.on_play(player)

    }
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Militia extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Attack Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10
    this.coins = 2
    this.draws = 0
    this.description = `The ${this.name}causes other players to discard down to 3 cards`
    }
  on_play(player){
    super.on_play(player)    //right now I'm just going to discard from 0th index
    //once sockets are in this needs to be a prompt
    for(let other_player of this.game.players){
      if (other_player!= player){
        for(let card of other_player.hand.cards)
        while(other_player.hand.count > 3){
          // otherplayer.ChooseCard()
          other_player.discard_card()
        }
      }
    }
    super.on_play(player)
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}
export class Witch extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Attack Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 2
    this.description = `The ${this.name} gives  other players curses`
  }
  on_play(player){
    super.on_play(player)
    let deck = this.game.find_deck("Curse", this.game.base_cards)
    for(let other_player of this.game.players){
      if (other_player!= player){
        let curse = deck.draw()
        other_player.gain(curse)
        // console.log(player)
      }
    }
    super.on_play(player)
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // } 
}


export class Moneylender extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.description = `The ${this.name} let's you trash a copper to gain +3 coins`
  }
  on_play(player){

    player.message.Playing = "Trash a copper to gain 3 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand" || card.name !== "Copper") {return player.message.Playing = "please select a copper to trash"}
      player.trash_card(card)
      player.coins +=3
      this.game.current_phase = "Action"
      super.on_play(player) 
    }
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // } 
}

export class Smithy extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 3
    this.description = `The ${this.name} draws 3 more cards`
  }
  // on_play(player){
  //   super.on_play(player)
  //   // console.log(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Throneroom extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.description = `The ${this.name} let's you play an action twice`
  }
  on_play(player){
    //man I keep seeing this pattern over and over I with there was some wya to   make this more generic so i didn't have to keep redoing this logic
    //ok this works fine for very simple action but it doesn't work on triggering on play effects well 
    //I think what i need to do is make a stack object and push effects into the
    //stack and then return to the stack to resolve them once complete
    //thats more than i feel like tackleing right now so I'll come back to it
    //so when the throne room is played it prompts you to select a card 
    //it pushes one phantom copy onto the stack and causes the player to place
    //one card from their hand onto the stack
    //at what point to I want to go back and look at the stack?

    player.message.Playing = "Choose an action to play twice"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand" || !card.type.includes("Action")) {return player.message.Playing = "please select an Action from your hand"}
      this.game.resolve_stack.push(card)
      player.put_in_play(card) // ok player puts one copy in play and the other copy triggers
      //I think the throne room needs to trigger this.game.begin_action_phase() but not sure
      // this.game.current_phase = "Action"
 
      super.on_play(player)
    }
    
  }
  // resolve(player){
  // super.resolve(player)
  

  // console.log("after the card resolve inside village", player)
  // }
}

export class Festival extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 2
    this.buys = 1
    this.pile_count = 10 
    this.coins = 2
    this.draws = 0
    this.description = `The ${this.name} gives you more actions buys and coins`
  }
  // on_play(player){
  //   super.on_play(player)
  //   // console.log(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Laboratory extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 1
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 2
    this.description = `The ${this.name} gives you 2 draws and 1 action`
  }
  // on_play(player){
  //   super.on_play(player)
  //   // console.log(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}
export class Market extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 1
    this.buys = 1
    this.pile_count = 10 
    this.coins = 1
    this.draws = 1
    this.description = `The ${this.name} gives you ${this.draws} draw, ${this.buys} buy, ${this.coins} and ${this.more_actions} action`
  }
  // on_play(player){
  //   super.on_play(player)
  //   // console.log(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Bureaucrat extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action Attack"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.description = `Gain a silver card put it on top of your deck. Each other player reveals a Victory card from his hand and puts it on his deck (or reveals a hand with no Victory cards).`
  }
  on_play(player){
    //running into the same problem I had with the curses so I'm going to me a game.find_deck
    let deck = this.game.find_deck("Silver", this.game.base_cards)
    let silver = deck.draw()
    player.gain(silver, player.deck)
    for(let other_player of this.game.players){
      if (other_player!= player){
        //man i need a way to stop having to type.cards
        for(let card of other_player.hand.cards){
          if(card.type.includes("Treasure")){
            other_player.move(card, other_player.deck)
            return
          }
        }
      }
    }
    super.on_play(player)
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Remodel extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.gain_amount = 2
    this.description = `Trash a card from your hand. Gain a card costing up to $2 more than the trashed card.`
  }
  on_play(player){
    
    //it's interesting that player stays bound to this through the entire resolution
    player.message.Playing = "Choose a card to trash or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {return player.message.Playing = "please select a card from your hand to trash"} 
      //do i even need the sepperate "trashing" "gain" "play" "resolve" states? not sure if I'm 
      //askign the question the answer is liekly no
      this.gain_amount += card.cost
      player.trash_card(card)
      player.message.Playing = `Choose a card to gain costing upto ${this.gain_amount} or pass`
      this.game.current_phase = "Playing"
      this.game.events["Playing"] = (card) => {
        
        if(card.curr_location.deck_type !== "store" || card.cost > this.gain_amount) {return player.message.Playing = `please select a card from the store with a cost less than ${this.gain_amount}`}  

        player.move(card, player.played)
        this.gain_amount = 2 //reseting for the throneroom
        super.on_play(player)
      }
    }
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class CouncilRoom extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 1
    this.pile_count = 10 
    this.coins = 0
    this.draws = 4
    this.description = `+4 Cards; +1 Buy Each other player draws a card.`
  }
  on_play(player){
    //it's interesting that player stays bound to this through the entire resolution
    for(let other_player of this.game.players){
      if(other_player != player){
        other_player.draw()
      }
    }
    super.on_play(player)
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Mine extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.gain_amount = 3
    this.description = `Trash a Treasure card from your hand. Gain a Treasure card costing up to $3 more; put it into your hand.`
  }
  on_play(player){

    //it's interesting that player stays bound to this through the entire resolution
    player.message.Playing = "Choose a card to trash or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      //might be worth while to make an acceptable target in this case Treasure
      if(card.curr_location.deck_type !== "hand" || !card.type.includes("Treasure")) {return player.message.Playing = "please select a Treasure card from your hand to trash"} 
      //do i even need the sepperate "trashing" "gain" "play" "resolve" states? not sure if I'm 
      //askign the question the answer is liekly no
      this.gain_amount += card.cost
      player.trash_card(card)
      player.message.Playing = `Choose a card to gain costing upto ${this.gain_amount} or pass`
      this.game.current_phase = "Playing"
      this.game.events["Playing"] = (card) => {
        
        if(card.curr_location.deck_type !== "store" || card.cost > this.gain_amount || !card.type.includes("Treasure")) {return player.message.Playing = `please select a Treasure from the store with a cost less than ${this.gain_amount}`}  

        player.move(card, player.hand)
        this.gain_amount = 3
        super.on_play(player)
      }
    }
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Gardens extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 0
    // this.victory_points =  Math.floor(owner.total_cards/10)
    this.type = "Victory Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.gain_amount = 3
    this.description = `Worth 1 Victory for every 10 cards in your deck (rounded down).`

  }
  @computed get victory_points(){
    if(!this.owner || !this.owner.total_cards){return 0}
    return  Math.floor(this.owner.total_cards/10)
    } 
  // set victory_points(owner){
  //   if(!this.owner || !this.owner.total_cards){return 0}
  //   return  Math.floor(owner.total_cards/10)
  //   } 
  // on_play(player){
  //   super.on_play(player)
  //   console.log(this.owner)
  //   return null
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Library extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.description = `Draw until you have 7 cards in hand. You may set aside any Action cards drawn this way, as you draw them; discard the set aside cards after you finish drawing.`
  }
  on_play(player){

    //it's interesting that player stays bound to this through the entire resolution
    while(player.hand.count < 7){
      let card = player.draw()
      if(card.type.includes("Action")){
        //this needs to be a button or modal but getting tired
        let res = prompt(`Enter yes to discard ${card.name}`)
        if(res == "yes"){
          player.discard_card(card)
        }
      }
    }
    super.on_play(player)
  }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
}

export class Adventurer extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.victory_points = 0
    this.type = "Action"
    this.more_actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.draws = 0
    this.description = `Draw cards from your deck until you have drawn 2 Treasure cards. Put those Treasure cards in your hand and discard the other drawn cards.`
  }
  on_play(player){
    
    let count =2
    //it's interesting that player stays bound to this through the entire resolution
    while(count > 0){
      let card = player.draw()
      if(!card.type.includes("Treasure")){
        player.discard_card(card)
        //this needs to be a button or modal but getting tired
      }else{count--}
      
    }
    super.on_play(player)
  // }
  // resolve(player){
  // // console.log("before the card resolve inside village", player)
  // super.resolve(player)
  // // console.log("after the card resolve inside village", player)
  // }
  }
}