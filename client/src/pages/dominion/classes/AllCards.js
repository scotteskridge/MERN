import { observable } from "mobx"
import { autorun, action } from "mobx-react"
import  store  from "../../../store"



export class Card{
  @observable curr_location = ""
  constructor(id){

   this.cost = 0;
   this.Victory_Povars = 0;
   this.type; // Action, Victory, Action - Attack, Action - Reaction, Treasure
   this.name;
  //  this.Ability; //This might need to be an object with methods?
   this.More_Actions;
   this.buys;
   this.coins = 0;
   this.Draws;
   this.Description;
   // deck, hand, played, discard, pile, trash
   // this may end up as an object litteral to map back to this.player.hand
   //not sure I need both of these may only need one or the other
   this.locations ={"deck" : null, "hand" : null, "played" : null, "discard" : null, "pile" : "im in a pile", "trash": null} 
   this.curr_location = "pile"
   this.id = id
  }
  OnPlay(player){
    //this would be a great place to add to current_game.log when I make one
    player.message.Action = ( `${player.name}, played a ${this.name} `+ "\n").concat(player.message.Action)
  }

  // OnPlay(player){
  //   Console.log(`${player.name} played a ${this.name}`);
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
                Laboratory] 
    this.BaseCards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
    // console.log("from thr all cards constructor idbase cards is", this.BaseCards)
  }
} 

export class Copper extends Card {
  constructor(id){
    super(id)
    this.cost = 1;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.name = "Copper";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 1;
    this.Draws = 0;
    this.Description = `A ${this.name} gives ${this.coins} coins`;
    this.pile_count = 60; 
    
   }
  OnPlay(player){
   console.log(player)
  }
}

export class Silver extends Card{
  constructor(id){
    super(id)
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.name = "Silver";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 2;
    this.Draws = 0;
    this.Description = `A ${this.name} has a buying value of 2`;
    this.pile_count = 40; 
    }
  OnPlay(player){
    console.log(player)
  }
}

export class Gold extends Card{
  constructor(id){
    super(id)
    this.cost = 6;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.name = "Gold";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 3;
    this.Draws = 0;
    this.Description = `A ${this.name} has a buying value of 3`;
    this.pile_count = 30; 
    }
  OnPlay(player){
    console.log(player)
  }
}

export class Estate extends Card {
  constructor(id){
    super(id)
    this.cost = 2;
    this.Victory_Points = 1;
    this.type = "Victory";
    this.name = "Estate";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `An ${this.name} is worth 1 Victory Point`
    this.pile_count = 24; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Duchy extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 3;
    this.type = "Victory";
    this.name = "Duchy";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.name} is worth 3 Victory Points`;
    this.pile_count = 12; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Province extends Card{
  constructor(id){
    super(id)
    this.cost = 8;
    this.Victory_Points = 6;
    this.type = "Victory";
    this.name = "Province";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.name} is worth 6 Victory Points`;
    this.pile_count = 12; 
  }
  OnPlay(player){
    console.log(player)
  }
}
export class Curse extends Card{
  constructor(id){
    super(id)
    this.cost = 0;
    this.Victory_Points = -1;
    this.type = "Victory";
    this.name = "Curse";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.name} subtracts 1 from your final score`;
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Village extends Card {
  constructor(id){
    super(id)
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Village";
    this.More_Actions = 2;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 1;
    this.Description = `The ${this.name} gives 2 actions and 1 draw`
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Cellar extends Card {
  constructor(id){
    super(id)
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Cellar";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.redraws = 0
    this.Description = `the ${this.name} let's you discard cards to redraw`;
  }
  OnPlay(player){
    console.log(player)
    store.current_game.current_phase = "Cellar"
    player.message.Playing = "Choose a card to discard or pass"
    store.current_game.current_phase = "Playing"
    store.current_game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {
        return this.current_player.message.Cellar = "please select a card from your hand to discard"
      }
      player.discard_card(card)
      this.redraws++
      store.current_game.card_to_resolve = this
    }
   

  }
  resolve(player){
    while(this.redraws >0){
      player.draw()
      this.redraws--
    }
  }
}



export class Chapel extends Card{
  constructor(id){
    super(id)
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Chapel";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.trash = 4
    this.Description = `A ${this.name} let's you trash upto 4 cards from your hand`;
  }
  OnPlay(player){
    // console.log(player)
    //would probably be a good idea to push these into an array and on clicking confirm
    //go through the array and trash all of them but one problem at a time
    this.trash = 4 // this resets it on play ... it does mean that the trashes available are wring while its in my discard
    player.message.Playing = "Choose up to four cards to trash or pass"
    store.current_game.current_phase = "Playing"
    store.current_game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "hand") {return this.current_player.Playing = "please select a card from your hand to trash"}
      player.trash_card(card)
      this.trash--
      
      if(this.trash <=0){
        store.current_game.current_phase = "Action"
        this.trash = 4
        return
      }
    }
  }
    // base.OnPlay(player);
    // int trashing = 4;
    // while(trashing > 0){
    //     System.Console.WriteLine("Choose a card to trash or 'pass':");
    //     player.DisplayPlayerHand();
    //     string userInput = Program.GetUserString();
    //         if(userInput != "Pass" && Int32.Parse(userInput)-1 < player.player_hand.Count ){
    //             // int userInput = Int32.Parse(Program.GetUserString());
    //             Card card = player.player_hand[Int32.Parse(userInput)-1];
    //             player.Trash(card);
    //             trashing--;
    //
    //         } else trashing = 0;
    //
    // }
  
}
export class Moat extends Card{
  constructor(id){
    super(id)
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Reaction Action";
    this.name = "Moat";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 2;
    this.Description = `A ${this.name} protects you from attacks`;
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
    return
  }
  OnShow(card){
    console.log("You showed the moat",card)
    return
  }
}

export class Chancellor extends Card{
  constructor(id){
    super(id)
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Reaction Action";
    this.name = "Chancellor";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count =10   
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name} puts your Deck into your discard pile`;
    }
  OnPlay(player){
    //I'd love to do for(let card of player.deck){player.discard(card)} //i know this broke shit in c#
    for(let card of player.deck.cards){
      player.discard_card(card)
    }
    return
  }
}
export class Woodcutter extends Card{
  constructor(id){
    super(id)
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Woodcutter";
    this.More_Actions = 0;
    this.buys = 1;
    this.pile_count = 10; 
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name} gives you another buy`;
  }
  OnPlay(player){
    super.OnPlay(player)
    
    console.log(player.message.Action)
    console.log(store.current_game.current_player.message.Action)
  
  }
}

export class Workshop extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Workshop";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name} let's you gain a card upto cost 4`;
    }
  OnPlay(player){
    player.message.Playing = "Gain a card costing up to 4 coins"
    store.current_game.current_phase = "Playing"
    store.current_game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 4) {return player.message.Playing = "Card must cost 4 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)
      store.current_game.current_phase = "Action"
      return
    }
  }
}
export class Feast extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Feast";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count =10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name} trashes it's self to gain a card upto 5 cost`;
    }
  OnPlay(player){
    player.message.Playing = "Gain a card costing up to 5 coins"
    store.current_game.current_phase = "Playing"
    store.current_game.events["Playing"] = (card) => {
      if(card.curr_location.deck_type !== "store") {return player.message.Playing = "please select a card to gain"}
      if(card.cost > 5) {return player.message.Playing = "Card must cost 5 or less"}
      card.curr_location.draw(card)
      player.played.add_to(card)
      player.trash_card(this)
      // console.log(store.current_game.trash)
      store.current_game.current_phase = "Action"
      return
    }
  }
}

export class Militia extends Card{
  constructor(id){
    super(id)
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Attack Action";
    this.name = "Militia";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name}causes other players to discard down to 3 cards`;
    }
  OnPlay(player){
    super.OnPlay(player)
    //right now I'm just going to discard from 0th index
    //once sockets are in this needs to be a prompt
    for(let other_player of store.current_game.players){
      if (other_player!= player){
        for(let card of other_player.hand.cards)
        while(other_player.hand.count > 3){
          // otherplayer.ChooseCard();
          other_player.discard_card();
        }
      }
    }
  }
}
export class Witch extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Attack Action";
    this.name = "Witch";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.name} gives  other players curses`;
  }
  OnPlay(player){
    super.OnPlay(player)
    for(let other_player of store.current_game.players){
      if (other_player!= player){
        //do stuff to gain a curse
        //this one is tricky becuase i don't know where the curse pile is
        //I can either do a loop to look for it or I can save it on construction
        //it;s late im tired I'll figure it out tomorrow
        let curseDeck = {}
        for(let deck of store.current_game.base_cards)
        console.log(other_player)
      }
    }
  }
}


export class Moneylender extends Card{
  constructor(id){
    super(id)
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Moneylender";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.Description = `The ${this.name} let's you trash a copper to gain +3 coins`;
  }
  OnPlay(player){
    console.log(player)
      // base.OnPlay(player);
      // System.Console.WriteLine("Choose a copper from your hand");
      // // need validations in case of null card
      // // need validations for only coppers
      // // need validation to allow for passing
      // Card card = Program.ActivePlayer.ChooseCard();
      // player.Trash(card);
      // Program.ActivePlayer.coins += 3;
  }
}

export class Smithy extends Card{
  constructor(id){
    super(id)
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Smithy";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 3;
    this.Description = `The ${this.name} draws 3 more cards`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Throneroom extends Card{
  constructor(id){
    super(id)
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Throneroom";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 3;
    this.Description = `The ${this.name} let's you play an action twice`;
  }
  OnPlay(player){
    console.log(player)
      // base.OnPlay(player);
      // System.Console.WriteLine("Choose an action to play twice");
      // Card card = Program.ActivePlayer.ChooseCard();
      // Program.ActivePlayer.Play_card(card, player);
      // Program.ActivePlayer.Trigger_card(card, player);
  }
}

export class Festival extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Festival";
    this.More_Actions = 2;
    this.buys = 1;
    this.pile_count = 10; 
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.name} gives you more actions buys and coins`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Laboratory";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}
export class Laboratory4 extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "Laboratory";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory2 extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "MY NEW OTHER LAB";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory3 extends Card{
  constructor(id){
    super(id)
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.name = "MY NEW LAB";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}
