// export class Card{
//   constructor(){
//    this.Cost = 0;
//    this.Victory_Povars = 0;
//    this.Type; // Action, Victory, Action - Attack, Action - Reaction, Treasure
//    this.Name;
//   //  this.Ability; //This might need to be an object with methods?
//    this.More_Actions;
//    this.More_Buys;
//    this.Coins = 0;
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

export class AllCards{
  
  constructor(){
    this.AllActions = [Village, Cellar, Chapel, Moat, Chancellor, 
                Woodcutter, Workshop, Feast, Militia, Witch, 
                Moneylender, Smithy, Throneroom, Festival,
                Laboratory, Laboratory3, Laboratory2] 
    this.BaseCards = [Copper, Silver, Gold, Estate, Duchy, Province, Curse]
  }
} 

export class Copper {
  constructor(){
    this.Cost = 1;
    this.Victory_Points = 0;
    this.Type = "Treasure";
    this.Name = "Copper";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Coins = 1;
    this.Draws = 0;
    this.Description = `A ${this.Name} gives ${this.Coins} coins`;
   }
  OnPlay(player){
   console.log(player)
  }
  PileCount(){
    return 60;
  }
}

export class Silver{
  constructor(){
    this.Cost = 3;
    this.Victory_Points = 0;
    this.Type = "Treasure";
    this.Name = "Silver";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `A ${this.Name} has a buying value of 2`;
    }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 40;
  }
}

export class Gold{
  constructor(){
    this.Cost = 6;
    this.Victory_Points = 0;
    this.Type = "Treasure";
    this.Name = "Gold";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 3;
    this.Draws = 0;
    this.Description = `A ${this.Name} has a buying value of 3`;
    }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 30;
  }
}

export class Estate {
  constructor(){
    this.Cost = 2;
    this.Victory_Points = 1;
    this.Type = "Victory";
    this.Name = "Estate";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `An ${this.Name} is worth 1 Victory Point`
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 24;
  }
}

export class Duchy{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 3;
    this.Type = "Victory";
    this.Name = "Duchy";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} is worth 3 Victory Points`;
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 12;
  }
}

export class Province{
  constructor(){
    this.Cost = 8;
    this.Victory_Points = 6;
    this.Type = "Victory";
    this.Name = "Province";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} is worth 6 Victory Points`;
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 12;
  }
}
export class Curse{
  constructor(){
    this.Cost = 0;
    this.Victory_Points = -1;
    this.Type = "Victory";
    this.Name = "Curse";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} subtracts 1 from your final score`;
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 10;
  }
}

export class Village {
  constructor(){
    this.Cost = 3;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Village";
    this.More_Actions = 2;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 1;
    this.Description = `The ${this.Name} gives 2 actions and 1 draw`
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 10;
  }
}

export class Cellar {
  constructor(){
    this.Cost = 2;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Cellar";
    this.More_Actions = 1;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `the ${this.Name} let's you discard cards to redraw`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
    // base.OnPlay(player);
    // bool discarding = true;
    // while(discarding){
    //     int newdraws = 0;
    //     System.Console.WriteLine("Choose a card to discard or 'Pass':");
    //     player.DisplayPlayerHand();
    //     string userInput = Program.GetUserString();
    //         if(userInput != "Pass" && Int32.Parse(userInput)-1 < player.player_hand.Count ){
    //             // int userInput = Int32.Parse(Program.GetUserString());
    //             Card card = player.player_hand[Int32.Parse(userInput)-1];
    //             player.Discard(card);
    //             newdraws++;
    //
    //         } else {
    //             for(int i = 0; i < newdraws; i++){
    //                 player.Draw_Card();
    //             }
    //             discarding = false;
    //         }
    // }
  }
}

export class Chapel{
  constructor(){
    this.Cost = 2;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Chapel";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `A ${this.Name} let's you trash upto 4 cards from your hand`;
  }
  PileCount(){
    return 10;
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
    this.Cost = 2;
    this.Victory_Points = 0;
    this.Type = "Reaction";
    this.Name = "Moat";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `A ${this.Name} protects you from attacks`;
  }
  OnPlay(player){
    console.log(player)
  }
  PileCount(){
    return 10;
  }
  OnShow(card){
    console.log(card)
  }
}

export class Chancellor{
  constructor(){
    this.Cost = 3;
    this.Victory_Points = 0;
    this.Type = "Reaction";
    this.Name = "Chancellor";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 2;
    this.Draws = 2;
    this.Description = `The ${this.Name} puts your Deck into your discard pile`;
    }
    PileCount(){
      return 10;
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
    this.Cost = 3;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Woodcutter";
    this.More_Actions = 0;
    this.More_Buys = 1;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} gives you another buy`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Workshop{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Attack";
    this.Name = "Workshop";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} let's you gain a card upto cost 4`;
    }
    PileCount(){
      return 10;
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
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Attack";
    this.Name = "Feast";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} trashes it's self to gain a card upto 5 cost`;
    }
    PileCount(){
      return 10;
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
    this.Cost = 4;
    this.Victory_Points = 0;
    this.Type = "Attack";
    this.Name = "Militia";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name}causes other players to discard down to 3 cards`;
    }
    PileCount(){
      return 10;
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
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Attack";
    this.Name = "Witch";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives  other players curses`;
  }
  PileCount(){
    return 10;
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
    this.Cost = 4;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Moneylender";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 0;
    this.Description = `The ${this.Name} let's you trash a copper to gain +3 coins`;
  }
  PileCount(){
    return 10;
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
      // Program.ActivePlayer.Buying_Power += 3;
  }
}

export class Smithy{
  constructor(){
    this.Cost = 4;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Smithy";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 3;
    this.Description = `The ${this.Name} draws 3 more cards`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Throneroom{
  constructor(){
    this.Cost = 4;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Throneroom";
    this.More_Actions = 0;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 3;
    this.Description = `The ${this.Name} let's you play an action twice`;
  }
  PileCount(){
    return 10;
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
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Festival";
    this.More_Actions = 2;
    this.More_Buys = 1;
    this.Buying_Power = 2;
    this.Draws = 0;
    this.Description = `The ${this.Name} gives you more actions buys and coins`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Laboratory";
    this.More_Actions = 1;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}
export class Laboratory4{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "Laboratory";
    this.More_Actions = 1;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory2{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "MY NEW OTHER LAB";
    this.More_Actions = 1;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}

export class Laboratory3{
  constructor(){
    this.Cost = 5;
    this.Victory_Points = 0;
    this.Type = "Action";
    this.Name = "MY NEW LAB";
    this.More_Actions = 1;
    this.More_Buys = 0;
    this.Buying_Power = 0;
    this.Draws = 2;
    this.Description = `The ${this.Name} gives you 2 draws and 1 action`;
  }
  PileCount(){
    return 10;
  }
  OnPlay(player){
    console.log(player)
  }
}
