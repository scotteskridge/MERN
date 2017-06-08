import { Deck } from "./DeckClass"
// import store from "../../../store"
import { autorun, observable, computed, action } from "mobx"

export class Player {
  @observable name = ""
  @observable actions = 1
  @observable buys = 1
  @observable coins = 0
  @observable score = 0
  @observable handSize = 5
  @observable deck = new Deck()
  @observable hand = new Deck()
  @observable played = new Deck()
  @observable discard = new Deck()
  @observable message = {
      Action : "Please select a card to play or pass",
      Buy : "Please select a card to buy or pass",
      Playing : "While Playing card Message if you see me fix me"
    }
  @observable button_text = {}

   
//consider making the a game pointer that refrences the game the player is in... then i don;t need
//to type game and I don't need to inport store... may just ask shane about this 
  constructor(name, game) {
    this.name = name
    this.actions = 1
    this.buys = 1
    this.coins = 0
    this.score = 0
    this.handSize = 5
    this.deck = new Deck(null, "deck") //this deck name is a poorly descriptive should this be draw_deck?
    this.hand = new Deck(null, "hand")
    this.played = new Deck(null, "played")
    this.discard = new Deck(null, "discard")
    this.deck.starter_deck()
    this.deck.shuffle()
    this.redraws = 0
    this.message = {
      Action : "Please select a card to play or pass",
      Buy : "Please select a card to buy or pass",
      Playing : "While Playing card Message if you see me fix me"
    }
    this.button_text = {
      Action : "Proceed to Buy",
      Buy : "End Turn",
      Resolve : "Pass",
      Playing : "Pass"
    }
    this.game = game
    // console.log(this)
    // this.draw_hand()
  }

  ////////////////// INIT METHODS ////////////////////

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
      this.message.Action = "You're out of actions"
      return null
    }
    if(!card.type.includes("Action")){
      this.message.Action =`Please select an action not a ${card.type}`
      return null
    }

    this.actions -= 1
    this.put_in_play(card)
    this.message.Action = "Please select a card to play or pass"
    card.OnPlay(this)
  }

  @action buy_card=(card)=>{
    console.log(this.name, "is trying to buy", card)
    console.log("the cards location is", card.curr_location.deck_type)
    //concider triggering the next phase as soon as buys hits 0
    if(this.buys <=0){
      this.message.Buy = "You're out of buys"
      return false
    }
    if(card.cost > this.coins){
      this.message.Buy = "Not enough coins, select a cheaper cards"
      return false
    }
    card.curr_location.remove(card)
    console.log("the cards location is", card.curr_location.deck_type)
    this.played.add_to(card)
    console.log("the cards location is", card.curr_location.deck_type)
    this.coins -= card.cost
    this.buys -= 1
    this.message.Buy = "Please select a card to buy or pass"
    return true
    //could throw in some logic here to adjust empty piles count if deck.count ==0
    //but I'd need to import game
  }
  discard_card(card = undefined){
    if(card == undefined){
      card = this.hand.discard()
      return this.discard.add_to(card)
    }
    //the add_to is affecting the location order matters
    card.curr_location.remove(card)  
    this.discard.add_to(card)
  }
  
  trash_card(card){
    card.curr_location.remove(card)
    this.game.trash.add_to(card)  
  }
  show_card(card){
    // console.log("Player is showing a card:", card)
  }
  
  //pulled this part out to skip validations notice on play effects dont trigger either
  put_in_play(card){
    this.hand.remove(card)
    this.played.add_to(card)
    this.update_stats(card)
  }
  trigger_effect(card){
    this.update_stats(card)
    card.OnPlay(this)
  }
  gain_curse(){
    let card = this.game.curses.draw()
    this.discard.add_to(card)
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
      this.discard_card(this.hand.cards[0]) 
    }
    while(this.played.count > 0){
      //will need to have some logic in here to check for cards that should remain in pla
      this.discard_card(this.played.cards[0]) 
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
