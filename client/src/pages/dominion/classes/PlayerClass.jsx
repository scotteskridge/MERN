import { Deck } from "./DeckClass"
// import store from "../../../store"
import { Copper, Estate, Card, CellarV2, Throneroom, Village,Workshop } from "./AllCards.js"
import { autorun, observable, computed, action } from "mobx"

export class Player {
  @observable name = ""
  @observable actions = 1
  @observable buys = 1
  @observable coins = 0
  @observable handSize = 5
  @observable deck = new Deck()
  @observable hand = new Deck()
  @observable played = new Deck()
  @observable bought = new Deck()
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
    this.handSize = 5
    this.deck = new Deck(null, "deck", this) //this deck name is a poorly descriptive should this be draw_deck?
    this.hand = new Deck(null, "hand", this)
    this.played = new Deck(null, "played", this)
    this.bought = new Deck (null, "bought", this)
    this.discard = new Deck(null, "discard", this)
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
    this.init_deck(this.game, this)
  }

  @computed get total_cards(){
    let total = 0
    total += this.deck.count
    total += this.hand.count
    total += this.played.count
    total += this.discard.count
    return total
  }

  tally_score(){
    const tally_ctx = {owner : this, player: this}
    return [this.deck, this.hand, this.played, this.discard]
      .map(deck => deck.tally_score(tally_ctx))
      .reduce((a,b) => a+b, 0)
  }

  get tally_coins(){ //put this into the deck class
    let coins = 0
    for (const card of this.played.cards){
      coins += card.tally_coins()
    }
    for (const card of this.bought.cards){
      coins -= card.cost
    }
    return coins
  }

  ////////////////// INIT METHODS ////////////////////

   @action init_deck(game, owner){
    // if(!store){return null}
    for (let i = 0; i < 7; i ++){
      this.deck.add_to(new Copper(game, owner))
    }
    for (let i = 0; i < 3; i ++){
      this.deck.add_to(new Estate(game, owner), this)
    }
    this.deck.shuffle()
  }



  draw(target = undefined){
    //the default action will be to draw from maindeck but this is built to allow
    //drawing from any deck if needed
    if(target == undefined){
      //if both decks are empty don't do anything
      if(this.deck.count <= 0 && this.discard.count <=0){
          return
        //if main deck is empty reshuffle the discard into main
        } else if (this.deck.count <= 0){
          this.reshuffle()
        }
      //and then draw the first card... should maybe add an if check here to ensure
      //main deck is not empty but I think the reshuffle takes car of that
      return this.hand.add_to(this.deck.draw())
    }
    
    else {
      this.hand.add_to(target.draw(), this)
      return null
    }
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
      this.deck.add_to(this.discard.draw(), this) //this bit of code is likely alos going to cause a bug
      this.deck.shuffle()
    }
  }

  //having the ability to play out of played is also causeing bugs
  @action play_card(card){
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
    // console.log("trying to put in play ",card)
    this.put_in_play(card)
    this.message.Action = "Please select a card to play or pass"
  }

  put_in_play(card){
  // console.log("trying to put in play ",card)
  this.hand.remove(card)
  this.played.add_to(card, this)
  this.game.resolve_stack.push(card) //at this point the same card should be in 2 arrays
  //the played.cards and the resolve stack, but its location attribute should reflect
  //the played.cards
  }

  @action buy_card=(card)=>{
    // console.log(this.name, "is trying to buy", card)
    // console.log("the cards location is", card.curr_location.deck_type)
    //concider triggering the next phase as soon as buys hits 0
    if(this.buys <=0){
      this.message.Buy = "You're out of buys"
      return false
    }
    if(card.cost > this.tally_coins){
      this.message.Buy = "Not enough coins, select a cheaper cards"
      return false
    }
    card.curr_location.remove(card)
    this.bought.add_to(card, this)
    this.buys -= 1
    this.message.Buy = "Please select a card to buy or pass"
    return true
    //could throw in some logic here to adjust empty piles count if deck.count ==0
    //but I'd need to import game
  }
  @action discard_card(card = undefined){
    if(card == undefined){
      card = this.hand.discard()
      return this.discard.add_to(card, this)
    }
    //the add_to is affecting the location order matters
    card.curr_location.remove(card)  
    this.discard.add_to(card, this)
  }
  
  trash_card(card){
    card.curr_location.remove(card)
    this.game.trash.add_to(card, this)  
  }
  show_card(card){
    // console.log("Player is showing a card:", card)
  }
  
  //pulled this part out to skip validations notice on play effects dont trigger either

  trigger_effect(card){ //becuase of how I reworks the card methods I don't actually need this anymore i don;t think
    card.to_stack(this)
  }
  gain(card, deck = this.discard){
    // card.curr_location.discard()
    this.deck.add_to(card, this)
  }
  @action move(card, target){
    card = card.curr_location.discard()
    target.add_to(card, this)
  }

  play_treasures(){
    for(let card of this.hand.cards){
      if(card.type.includes("Treasure")){
        this.put_in_play(card)
      }
    }
  }

//moving this to the card on play becuase of throne room problems
  // @action update_stats(card){
  //   this.actions += card.More_Actions
  //   this.buys += card.buys
  //   this.coins += card.coins
  //   for(let i =0; i < card.Draws; i++){
  //     this.draw()
  //   }
  // }

  end_turn(){
    // console.log(this.name, "is ending his turn")
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
    while(this.bought.count > 0){
      //will need to have some logic in here to check for cards that should remain in pla
      this.discard_card(this.bought.cards[0]) 
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
