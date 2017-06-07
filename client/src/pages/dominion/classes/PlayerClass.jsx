import { Deck } from "./DeckClass"
import store from "../../../store"
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
  @observable feedback = "Select a card to play"
  @observable button_text = "Go to buy phase"

  constructor(name) {
    this.name = name
    this.actions = 1
    this.buys = 1
    this.coins = 0
    this.score = 0
    this.handSize = 5
    this.deck = new Deck //this deck name is a poorly descriptive should this be draw_deck?
    this.hand = new Deck
    this.played = new Deck
    this.discard = new Deck
    this.feedback = "Select a card to play"
    this.deck.starter_deck()
    this.deck.shuffle()
    // console.log(this)
    // this.draw_hand()
  }

  @action tally_score(){
    //was doing this by concating all decks into a master all cards and then
    //counting up the points of card of all cards... btu that was breaking mobx in weird ways
    //moved the tally function down to the deck level
    this.score = 0
    this.score += this.deck.tally()
    this.score += this.hand.tally()
    this.score += this.played.tally()
    this.score += this.discard.tally()
    return this.score
  }

  draw(deck = undefined){
    //the default action will be to draw from maindeck but this is built to allow
    //drawing from any deck if needed
    if(deck == undefined){
      //if both decks are empty don't do anything
      if(this.deck.count <= 0 && this.discard.count <=0){
          return
        //if main deck is empty reshuffle the discard into main
        } else if (this.deck.count <= 0){
          this.reshuffle()
        }
      //and then draw the first card... should maybe add an if check here to ensure
      //main deck is not empty but I think the reshuffle takes car of that
      this.hand.add_to(this.deck.draw())
    }
    
    else {
      //put code here to draw from the passed in deck
      return null}
  }
  

  draw_hand(){
    //this was a for loop but changed to while loop to only draw upto
    //max hand size instead of drawing the amount of hand size
    while(this.hand.count < this.handSize ){
      this.draw()
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
    //at some point I'm going to need to have a playable flag that can toggle
    //and have that flag change or be observed by the card level onClick method
    //going to need to do somethign similar with the discard allowing cards to stay in play for multiple turns

    //concider triggering the next phase as soon as actions hits 0
    if(this.actions <=0){
      this.feedback = "You're out of actions"
      return null
    }
    if(!card.type.includes("Action")){
      this.feedback =`Please select an action not a ${card.type}`
      return null
    }

    if(this.actions <=0) {
      this.feedback ="no more actions"
      return null
    }
    this.actions -= 1
    this.put_in_play(card)
    card.OnPlay(this)
  }

  buy_card(deck){
    //concider triggering the next phase as soon as buys hits 0
    if(this.buys <=0){
      this.feedback = "You're out of buys"
      return null
    }
    if(deck.cards[0].cost > this.coins){
      this.feedback = "Not enough coins, select a cheaper cards"
      return null
    }
    // console.log(this.name, "is trying to buy", deck)
    let card = deck.draw()
    this.played.add_to(card)
    this.coins -= card.cost
    this.buys -= 1
    //could throw in some logic here to adjust empty piles count if deck.count ==0
    //but I'd need to import game
    if(deck.count <= 0){
      store.current_game.num_piles_to_end -= 1
    }


  }
  //pulled this part out to skip validations notice on play effects dont trigger either
  put_in_play(card){
    this.hand.remove(card)
    this.played.add_to(card)
    this.update_stats(card)
  }

  play_treasures(){
    for(let card of this.hand.cards){
      if(card.type.includes("Treasure")){
        this.put_in_play(card)
      }
    }
  }

  @action update_stats(card){
    this.actions += card.More_Actions
    this.buys += card.buys
    this.coins += card.coins
    for(let i =0; i < card.Draws; i++){
      this.draw()
    }
  }

  end_turn(){
    console.log(this.name, "is ending his turn")
    //eventually this will need to be for every card with discard = true
    //move cards to discard pile

    while(this.hand.count > 0){ 
      //will need to have some logic in here to check for cards that should remain in play
      this.discard.add_to(this.hand.cards[0])
      this.hand.remove(this.hand.cards[0])    
    }
    while(this.played.count > 0){
      //will need to have some logic in here to check for cards that should remain in pla
      this.discard.add_to(this.played.cards[0])
      this.played.remove(this.played.cards[0])
      // this.discard.add_to(this.played.draw()) //this breaks in strange ways
    }
    this.reset_stats()
    this.check_cards_in_play() //needs to happen before redraw
    this.draw_hand()
  }
  //do I need to track the current actions buys etc, and the base... that way I can allow
  //for cards that permanantly effect the base... or I could reset everything but then
  //in the start phase adjust stats by checking for what cards are in play
  reset_stats(){
    this.actions = 1
    this.buys = 1
    this.coins = 0

  }

  //this is here to handle things that stay in play and havent been discarded yet
  check_cards_in_play(){
    for(let card in this.played){
      //do stuff
      return null
    }
  }

} //// END PLAYER CLASS


// let scottsdeck = new Deck
// scottsdeck.starter_deck()
// scottsdeck.shuffle()
