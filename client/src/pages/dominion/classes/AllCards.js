import { observable, computed, action  } from "mobx"
import { autorun } from "mobx-react"
import  store  from "../../../store"


//I could do the same thing here that i did with player
//rather than having type as a string I should likely have type as an
//interface then only cards that are of type victory need to have an atribute
//of Victory_Points
//all of these arributes really should be lower case
export class Card{
  @observable curr_location = ""
  constructor(game, owner){

   this.cost = 0
  //  this.Victory_Points = 0
   this.type // Action, Victory, Action - Attack, Action - Reaction, Treasure
   this.name
  //  this.Ability //This might need to be an object with methods?
   this.More_Actions
   this.buys
   this.coins = 0
   this.Draws
   this.Description
   // deck, hand, played, discard, pile, trash
   // this may end up as an object litteral to map back to this.player.hand
   //not sure I need both of these may only need one or the other
  //  this.locations ={"deck" : null, "hand" : null, "played" : null, "discard" : null, "pile" : "im in a pile", "trash": null} 
   this.curr_location = "pile"
   this.game = game
   this.owner = owner
  }
  @action OnPlay(player = this.owner){
   
    //this would be a great place to add to current_game.log when I make one
    player.message.Action = ( `${player.name}, played a ${this.name}. `+ "\n").concat(player.message.Action)
    player.actions += this.More_Actions
    player.buys += this.buys
    player.coins += this.coins
    for(let i =0; i < this.Draws; i++){
      player.draw()
    }


  }

  // OnPlay(player){
   
  //   Console.log(`${player.name} played a ${this.name}`)
  // }

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
    this.cost = 0
    this.Victory_Points = 0
    this.type = "Treasure"
    this.name = "Copper"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 1
    this.Draws = 0
    this.Description = `A ${this.name} gives ${this.coins} coins`
    this.pile_count = 60 
    
   }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Silver extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.Victory_Points = 0
    this.type = "Treasure"
    this.name = "Silver"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 2
    this.Draws = 0
    this.Description = `A ${this.name} has a buying value of 2`
    this.pile_count = 40 
    }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Gold extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 6
    this.Victory_Points = 0
    this.type = "Treasure"
    this.name = "Gold"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 3
    this.Draws = 0
    this.Description = `A ${this.name} has a buying value of 3`
    this.pile_count = 30 
    }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Estate extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.Victory_Points = 1
    this.type = "Victory"
    this.name = "Estate"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 0
    this.Draws = 0
    this.Description = `An ${this.name} is worth 1 Victory Point`
    this.pile_count = 24 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Duchy extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 3
    this.type = "Victory"
    this.name = "Duchy"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 0
    this.Draws = 0
    this.Description = `A ${this.name} is worth 3 Victory Points`
    this.pile_count = 12 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Province extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 8
    this.Victory_Points = 6
    this.type = "Victory"
    this.name = "Province"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 0
    this.Draws = 0
    this.Description = `A ${this.name} is worth 6 Victory Points`
    this.pile_count = 12 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}
export class Curse extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 0
    this.Victory_Points = -1
    this.type = "Victory"
    this.name = "Curse"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 0
    this.Draws = 0
    this.Description = `A ${this.name} subtracts 1 from your final score`
    this.pile_count = 24 // might be fun to do somethign with this similar to the garden and make it's pile count dynamic based on players in the game 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Cellar extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Cellar"
    this.More_Actions = 1
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.redraws = 0
    this.Description = `the ${this.name} let's you discard cards to redraw`
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
    this.game.current_phase = "Cellar"
    player.message.Playing = "Choose a card to discard or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {
        return this.current_player.message.Cellar = "please select a card from your hand to discard"
      }
      player.discard_card(card)
      this.redraws++
      this.game.card_to_resolve = this //wonder if I can use this for the throneroom?
    }
   

  }
  resolve(player){
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
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Chapel"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.trash = 4
    this.Description = `A ${this.name} let's you trash upto 4 cards from your hand`
  }
  OnPlay(player){
    super.OnPlay(player)
    // console.log(player)
    //would probably be a good gameea to push these into an array and on clicking confirm
    //go through the array and trash all of them but one problem at a time
    this.trash = 4 // this resets it on play ... it does mean that the trashes available are wring while its in my discard
    player.message.Playing = "Choose up to four cards to trash or pass"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {return this.current_player.Playing = "please select a card from your hand to trash"}
      player.trash_card(card)
      this.trash--
      
      if(this.trash <=0){
        this.game.current_phase = "Action"
        this.trash = 4
        return
      }
    }
  }

  
}
export class Moat extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 2
    this.Victory_Points = 0
    this.type = "Reaction Action"
    this.name = "Moat"
    this.More_Actions = 0
    this.buys = 0
    this.coins = 0
    this.Draws = 2
    this.Description = `A ${this.name} protects you from attacks`
    this.pile_count = 10 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
    return
  }
  OnShow(card){
    console.log("You showed the moat",card)
    return
  }
}

export class Chancellor extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.Victory_Points = 0
    this.type = "Reaction Action"
    this.name = "Chancellor"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count =10   
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name} puts your Deck into your discard pile`
    }
  OnPlay(player){
    super.OnPlay(player)
    //I'd love to do for(let card of player.deck){player.discard(card)} //i know this broke shit in c#
    for(let card of player.deck.cards){
      player.discard_card(card)
    }
    return
  }
}
export class Village extends Card {
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Village"
    this.More_Actions = 2
    this.buys = 0
    this.coins = 0
    this.Draws = 1
    this.Description = `The ${this.name} gives 2 actions and 1 draw`
    this.pile_count = 10 
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}
export class Woodcutter extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Woodcutter"
    this.More_Actions = 0
    this.buys = 1
    this.pile_count = 10 
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name} gives you another buy`
  }
  OnPlay(player){
    super.OnPlay(player)
  }
}

export class Workshop extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 3
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Workshop"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name} let's you gain a card upto cost 4`
    }
  OnPlay(player){
    super.OnPlay(player)
    player.message.Playing = "Gain a card costing up to 4 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 4) {return player.message.Playing = "Card must cost 4 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)
      this.game.current_phase = "Action"
      return
    }
  }
}
export class Feast extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Feast"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count =10
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name} trashes it's self to gain a card upto 5 cost`
    }
  OnPlay(player){
    super.OnPlay(player)
    player.message.Playing = "Gain a card costing up to 5 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 5) {return player.message.Playing = "Card must cost 5 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)
      player.trash_card(this)
      // console.log(this.game.trash)
      this.game.current_phase = "Action"
      return
    }
  }
}

export class Militia extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Attack Action"
    this.name = "Militia"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name}causes other players to discard down to 3 cards`
    }
  OnPlay(player){
    super.OnPlay(player)    //right now I'm just going to discard from 0th index
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
  }
}
export class Witch extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Attack Action"
    this.name = "Witch"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 2
    this.Description = `The ${this.name} gives  other players curses`
  }
  OnPlay(player){
    super.OnPlay(player)
    let deck = this.game.find_deck("Curse", this.game.base_cards)
    for(let other_player of this.game.players){
      if (other_player!= player){
        let curse = deck.draw()
        other_player.gain(curse)
        // console.log(player)
      }
    }
  }
}


export class Moneylender extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Moneylender"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.Description = `The ${this.name} let's you trash a copper to gain +3 coins`
  }
  OnPlay(player){
    super.OnPlay(player)
    player.message.Playing = "Trash a copper to gain 3 coins"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand" || card.name !== "Copper") {return player.message.Playing = "please select a copper to trash"}
      player.trash_card(card)
      player.coins +=3
      this.game.current_phase = "Action"
      return
    }
  }
}

export class Smithy extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Smithy"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 3
    this.Description = `The ${this.name} draws 3 more cards`
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Throneroom extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Throneroom"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.Description = `The ${this.name} let's you play an action twice`
  }
  OnPlay(player){
    super.OnPlay(player)
    //man I keep seeing this pattern over and over I with there was some wya to make this more generic so i didn't have to keep redoing this logic
    //ok this works fine for very simple action but it doesn't work on triggering on play effects well 
    //I think what i need to do is make a stack object and push effects into the
    //stack and then return to the stack to resolve them once complete
    //thats more than i feel like tackleing right now so I'll come back to it
    player.message.Playing = "Choose an action to play twice"
    this.game.current_phase = "Playing"
    this.game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand" || !card.type.includes("Action")) {return player.message.Playing = "please select an Action from your hand"}
      player.put_in_play(card)
      card.OnPlay(player)

      player.trigger_effect(card)
      this.game.current_phase = "Action"
      return
    }
  }
}

export class Festival extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Festival"
    this.More_Actions = 2
    this.buys = 1
    this.pile_count = 10 
    this.coins = 2
    this.Draws = 0
    this.Description = `The ${this.name} gives you more actions buys and coins`
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Laboratory extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Laboratory"
    this.More_Actions = 1
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 2
    this.Description = `The ${this.name} gives you 2 draws and 1 action`
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}
export class Market extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Market"
    this.More_Actions = 1
    this.buys = 1
    this.pile_count = 10 
    this.coins = 1
    this.Draws = 1
    this.Description = `The ${this.name} gives you ${this.Draws} draw, ${this.buys} buy, ${this.coins} and ${this.More_Actions} action`
  }
  OnPlay(player){
    super.OnPlay(player)
    console.log(player)
  }
}

export class Bureaucrat extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action Attack"
    this.name = "Bureaucrat"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.Description = `Gain a silver card put it on top of your deck. Each other player reveals a Victory card from his hand and puts it on his deck (or reveals a hand with no Victory cards).`
  }
  OnPlay(player){
    super.OnPlay(player)
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
  }
}

export class Remodel extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 4
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Remodel"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.gain_amount = 2
    this.Description = `Trash a card from your hand. Gain a card costing up to $2 more than the trashed card.`
  }
  OnPlay(player){
    super.OnPlay(player)
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
        this.game.current_phase = "Action"
      }
    }
  }
}

export class CouncilRoom extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "CouncilRoom"
    this.More_Actions = 0
    this.buys = 1
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 4
    this.Description = `+4 Cards; +1 Buy Each other player draws a card.`
  }
  OnPlay(player){
    super.OnPlay(player)
    //it's interesting that player stays bound to this through the entire resolution
    for(let other_player of this.game.players){
      if(other_player != player){
        other_player.draw()
      }
    }
  }
}

export class Mine extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Mine"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.gain_amount = 3
    this.Description = `Trash a Treasure card from your hand. Gain a Treasure card costing up to $3 more; put it into your hand.`
  }
  OnPlay(player){
    super.OnPlay(player)
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
        this.game.current_phase = "Action"
      }
    }
  }
}

//disableing gardens until I understand computed a little better

export class Gardens extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 0
    // this.Victory_Points =  Math.floor(owner.total_cards/10)
    this.type = "Victory Action"
    this.name = "Gardens"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.gain_amount = 3
    this.Description = `Worth 1 Victory for every 10 cards in your deck (rounded down).`

  }
  @computed get Victory_Points(){
    if(!this.owner || !this.owner.total_cards){return 0}
    return  Math.floor(this.owner.total_cards/10)
    } 
  // set Victory_Points(owner){
  //   if(!this.owner || !this.owner.total_cards){return 0}
  //   return  Math.floor(owner.total_cards/10)
  //   } 
  OnPlay(player){
    super.OnPlay(player)
    console.log(this.owner)
    return null
  }
}

export class Library extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Library"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.Description = `Draw until you have 7 cards in hand. You may set aside any Action cards drawn this way, as you draw them; discard the set aside cards after you finish drawing.`
  }
  OnPlay(player){
    super.OnPlay(player)
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
  }
}

export class Adventurer extends Card{
  constructor(game, owner){
    super(game, owner)
    this.cost = 5
    this.Victory_Points = 0
    this.type = "Action"
    this.name = "Adventurer"
    this.More_Actions = 0
    this.buys = 0
    this.pile_count = 10 
    this.coins = 0
    this.Draws = 0
    this.Description = `Draw cards from your deck until you have drawn 2 Treasure cards. Put those Treasure cards in your hand and discard the other drawn cards.`
  }
  OnPlay(player){
    super.OnPlay(player)
    let count =2
    //it's interesting that player stays bound to this through the entire resolution
    while(count > 0){
      let card = player.draw()
      if(!card.type.includes("Treasure")){
        player.discard_card(card)
        //this needs to be a button or modal but getting tired
      }else{count--}
      
    }
  }
}