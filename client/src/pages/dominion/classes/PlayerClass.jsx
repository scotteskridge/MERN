import { Deck } from "./DeckClass"
import { autorun, observable, computed, action } from "mobx"

export class Player {
  @observable name = ""
  @observable actions = 1
  @observable buys = 1
  @observable coins = 0
  @observable score = 0
  @observable handSize = 5
  @observable deck = new Deck
  @observable hand = new Deck
  @observable played = new Deck

  constructor(name) {
    this.name = name
    this.actions = 1
    this.buys = 1
    this.coins = 0
    this.score = 0
    this.handSize = 5
    this.deck = new Deck
    this.hand = new Deck
    this.played = new Deck
    this.discard = new Deck
    this.deck.starter_deck()
    this.deck.shuffle()
    
    // this.draw_hand()
  }

  @action tally_score(){
    this.score = 0
    let allcards = this.deck.cards.concat(this.hand.cards).concat(this.played.cards).concat(this.discard.cards)
    // console.log(this.name, "has these cards:", this.deck.cards)
    // console.log(allcards, "all the cards")
    for (let card of allcards){
      // console.log("card and score:", card, this.score )
      if(card.Victory_Points){ this.score += card.Victory_Points}
      
    }
    return this.score
  }

  draw(deck){
    return deck.cards.pop()
  }

  draw_hand(){
    //this was a for loop but changed to while loop to only draw upto
    //max hand size instead of drawing the amount of hand size
    while(this.hand.count < this.handSize ){
      if(this.deck.count <= 0 && this.discard.count <=0){
        return
      } else if (this.deck.count <= 0){
        this.reshuffle()
      }
      this.hand.add_to(this.deck.draw())
    }
  }

  reshuffle(){
    while(this.discard.count > 0){
      this.deck.add_to(this.discard.draw()) //this bit of code is likely alos going to cause a bug
      this.deck.shuffle()
    }
  }

  //having the ability to play out of played is also causeing bugs
  play_card(card){
    // console.log(card, this)
    this.hand.remove(card)
    this.played.add_to(card)
    // this.played.cards.push(this.hand.cards.splice(this.hand.cards.indexOf(card), 1))
    console.log(this.name, "Played a card", this.played.cards)
  }

  end_turn(){
    console.log(this.name, "is ending his turn")
    //eventually this will need to be for every card with discard = true
    //move card to discard pile
    //I'd like to do a for(card of hand.cards) but I think if i do that it
    //breaks becuase i'm shortening the list as I pop it
    //ok somethign weird is going on with this bit of code this.discard.add_to(this.played.draw())
    //the eract object is wrapping around the card object and its causeing some weird bugs
    while(this.hand.count > 0){
      this.discard.add_to(this.hand.cards[0])
      this.hand.remove(this.hand.cards[0])    
    }
    while(this.played.count > 0){
      this.discard.add_to(this.played.cards[0])
      this.played.remove(this.played.cards[0])
      // this.discard.add_to(this.played.draw()) //this breaks in strange ways
    }
  }
}


// let scottsdeck = new Deck
// scottsdeck.starter_deck()
// scottsdeck.shuffle()
