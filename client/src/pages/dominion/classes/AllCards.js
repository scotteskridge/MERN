// export class Card{
//   constructor(){
//    this.cost = 0;
//    this.Victory_Povars = 0;
//    this.type; // Action, Victory, Action - Attack, Action - Reaction, Treasure
//    this.Name;
//   //  this.Ability; //This might need to be an object with methods?
//    this.More_Actions;
//    this.buys;
//    this.coins = 0;
//    this.Draws;
//    this.Description;
//   }
//
//   // OnPlay(player){
//   //   Console.log(`${player.Name} played a ${this.Name}`);
//   // }
//
// }

// import Copper from '../../../static/assets/Copper.jpg' //not sure why this doesnt work
//may want to add an img atribute take a look at header on how to import those

//useing the .includes() on the action string allows the type to have multiple types!
import { observable } from "mobx"


export class AllCards{
  @observable AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                Woodcutter, Workshop, Feast, Militia, Witch, 
                Moneylender, Smithy, Throneroom, Festival,
                Laboratory, Laboratory3, Laboratory2]
  @observable base_cards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
  constructor(){
    this.AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                Woodcutter, Workshop, Feast, Militia, Witch, 
                Moneylender, Smithy, Throneroom, Festival,
                Laboratory, Laboratory3, Laboratory2] 
    this.BaseCards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
    // console.log("from thr all cards constructor base cards is", this.BaseCards)
  }
} 

export class Copper {
  constructor(){
    this.cost = 1;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.Name = "Copper";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 1;
    this.Draws = 0;
    this.Description = `A ${this.Name} gives ${this.coins} coins`;
    this.pile_count = 60; 
   }
  OnPlay(player){
  //  console.log(player)
  }
}

export class Silver{
  constructor(){
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.Name = "Silver";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 2;
    this.Draws = 0;
    this.Description = `A ${this.Name} has a buying value of 2`;
    this.pile_count = 40; 
    }
  OnPlay(player){
    console.log(player)
  }
}

export class Gold{
  constructor(){
    this.cost = 6;
    this.Victory_Points = 0;
    this.type = "Treasure";
    this.Name = "Gold";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 3;
    this.Draws = 0;
    this.Description = `A ${this.Name} has a buying value of 3`;
    this.pile_count = 30; 
    }
  OnPlay(player){
    console.log(player)
  }
}

export class Estate {
  constructor(){
    this.cost = 2;
    this.Victory_Points = 1;
    this.type = "Victory";
    this.Name = "Estate";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `An ${this.Name} is worth 1 Victory Point`
    this.pile_count = 24; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Duchy{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 3;
    this.type = "Victory";
    this.Name = "Duchy";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} is worth 3 Victory Points`;
    this.pile_count = 12; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Province{
  constructor(){
    this.cost = 8;
    this.Victory_Points = 6;
    this.type = "Victory";
    this.Name = "Province";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} is worth 6 Victory Points`;
    this.pile_count = 12; 
  }
  OnPlay(player){
    console.log(player)
  }
}
export class Curse{
  constructor(){
    this.cost = 0;
    this.Victory_Points = -1;
    this.type = "Victory";
    this.Name = "Curse";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} subtracts 1 from your final score`;
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Village {
  constructor(){
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Village";
    this.More_Actions = 2;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 1;
    this.Description = `The ${this.Name} gives 2 actions and 1 draw`
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Cellar {
  constructor(){
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Cellar";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.Description = `the ${this.Name} let's you discard cards to redraw`;
  }
  OnPlay(player){
    console.log(player)
    let discarding = true;
    // while(discarding){
        let newdraws = 0;
        player.feedback = "Choose a card to discard or 'Pass':"
        //right now each card is assigned an on click event by its display handler
        //however the effect of what happens when you click on a card needs to change
        //based on the current game state... ie.. play when the phase is action, buy when its
        //but etc. in this case the state is discarding and the onclick action needs to be
        //changed so rather than being hard coded in the function that I'm passing into the 
        //onlick needs to be dynamic and be updated based on state
            // if(userInput != "Pass" && Int32.Parse(userInput)-1 < player.player_hand.Count ){
            //     // int userInput = Int32.Parse(Program.GetUserString());
            //     Card card = player.player_hand[Int32.Parse(userInput)-1];
            //     player.Discard(card);
            //     newdraws++;
    
            // } else {
            //     for(int i = 0; i < newdraws; i++){
            //         player.Draw_Card();
            //     }
            //     discarding = false;
            // }
    // }
  }
}

export class Chapel{
  constructor(){
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Chapel";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} let's you trash upto 4 cards from your hand`;
  }
  OnPlay(player){
    console.log(player)
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
}
export class Moat{
  constructor(){
    this.cost = 2;
    this.Victory_Points = 0;
    this.type = "Reaction Action";
    this.Name = "Moat";
    this.More_Actions = 0;
    this.buys = 0;
    this.coins = 0;
    this.Draws = 2;
    this.Description = `A ${this.Name} protects you from attacks`;
    this.pile_count = 10; 
  }
  OnPlay(player){
    console.log(player)
  }
  OnShow(card){
    console.log(card)
  }
}

export class Chancellor{
  constructor(){
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Reaction Action";
    this.Name = "Chancellor";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count =10   
    this.coins = 2;
    this.Draws = 2;
    this.Description = `The ${this.Name} puts your Deck into your discard pile`;
    }
  OnPlay(player){
    console.log(player)
    // base.OnPlay(player);
    // System.Console.WriteLine("The Chancellor Shuffels your deck into your discard pile");
    // for (int i=0; i < player.player_draw_deck.cards.Count; i++){
    //     player.DiscardFromDeck();
    // }
  }

}
export class Woodcutter{
  constructor(){
    this.cost = 3;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Woodcutter";
    this.More_Actions = 0;
    this.buys = 1;
    this.pile_count = 10; 
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} gives you another buy`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Workshop{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Workshop";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} let's you gain a card upto cost 4`;
    }
  OnPlay(player){
    console.log(player)
    // base.OnPlay(player);
    // System.Console.WriteLine("Name a card to gain that costs less than 4");
    // Card card = player.playmat.PickPile(Program.GetUserString());
    // player.Gain(card);
  }
}
export class Feast{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Feast";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count =10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} trashes it's self to gain a card upto 5 cost`;
    }
  OnPlay(player){
    console.log(player)
      // base.OnPlay(player);
      // System.Console.WriteLine("Name a card to gain that costs less than 5");
      // Card card = player.playmat.PickPile(Program.GetUserString());
      // player.Gain(card);
      // player.Trash(this);
  }
}

export class Militia{
  constructor(){
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Attack Action";
    this.Name = "Militia";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name}causes other players to discard down to 3 cards`;
    }
  OnPlay(player){
    console.log(player)
    // base.OnPlay(player);
    // foreach(var otherplayer in Program.Players){
    //     if (otherplayer!= player){
    //         for (int i =3; i <otherplayer.player_hand.Count; i++){
    //         Card card = otherplayer.ChooseCard();
    //         otherplayer.Discard(card);
    //
    //         }
    //     }
    // }
  }
}
export class Witch{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Attack Action";
    this.Name = "Witch";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives  other players curses`;
  }
  OnPlay(player){
    console.log(player)
    // base.OnPlay(player);
    // foreach(var otherplayer in Program.Players){
    //     if (otherplayer!= player){
    //         Card curse = otherplayer.playmat.PickPile("Curse");
    //         otherplayer.Gain(curse);
    //
    //         }
    //     }
  }
}


export class Moneylender{
  constructor(){
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Moneylender";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 0;
    this.Description = `The ${this.Name} let's you trash a copper to gain +3 coins`;
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

export class Smithy{
  constructor(){
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Smithy";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 3;
    this.Description = `The ${this.Name} draws 3 more cards`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Throneroom{
  constructor(){
    this.cost = 4;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Throneroom";
    this.More_Actions = 0;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 3;
    this.Description = `The ${this.Name} let's you play an action twice`;
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

export class Festival{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Festival";
    this.More_Actions = 2;
    this.buys = 1;
    this.pile_count = 10; 
    this.coins = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} gives you more actions buys and coins`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Laboratory";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}
export class Laboratory4{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "Laboratory";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory2{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "MY NEW OTHER LAB";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory3{
  constructor(){
    this.cost = 5;
    this.Victory_Points = 0;
    this.type = "Action";
    this.Name = "MY NEW LAB";
    this.More_Actions = 1;
    this.buys = 0;
    this.pile_count = 10; 
    this.coins = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  OnPlay(player){
    console.log(player)
  }
}
