import  React from "react"

import { observable, computed, action } from "mobx"
import { DisplayCard } from "../componants/DisplayCard"
import store from "../../../store"


//I think that all of my deck classes should extend array so that I dont have to keep calling
//deck.cards but I'm not realy sure how to make that work and it would break alot of code :)
// class MyArray extends Array {
//   anatribute = "look at me"
//   somecards = [new Card]

//   // Overwrite species to the parent Array constructor
//   static get [Symbol.species]() { return Array; }
// }

// var a = new MyArray(1,2,3);
// var mapped = a.map(x => x * x);

// console.log(a); // false
// console.log(mapped instanceof Array);   // true


export class Deck {
  @observable cards = []
  @observable deck_type = ""
  
  constructor(card , deck_type, owner ){
    // console.log("store at construction",store)
    this.cards = []
    if (card){
      let aCard = new card
      this.name = aCard.name
      for(let i=0; i <aCard.pile_count; i++){
        this.add_to(new card(store.current_game, owner))
      }
    }
    this.deck_type = deck_type
  
  }
  @computed get count(){
    return this.cards.length
  } 
  //starter deck should really be in the game class this is especially obvious that store is throwing erros at
  //init this is even more true as I don't really need to pass params for this... leaving here for now
  //but come back and clean this up
 

  shuffle(){
    for(let i = 0; i <this.cards.length; i++){
      let j = Math.floor(Math.random()*this.cards.length)
      let temp = this.cards[j]
      this.cards[j] = this.cards[i]
      this.cards[i] = temp
    }
  }
  @action add_to =(card, owner)=>{ 
    this.cards.push(card)
    card.curr_location = this
    if(owner != undefined){
      card.owner = owner
    }
    // console.log(card)
    return card
  }

  draw(card = undefined){
    if(card === undefined){
      return this.cards.pop()
    }
    let index = this.cards.indexOf(card)
    return this.cards.splice(index,1)
  }
  //are draw and discard different?
  discard(){
    return this.cards.pop()
  }

  @action remove(card){
    let index = this.cards.indexOf(card)
    return this.cards.splice(index,1)
  }

  //as much as I like my show method I just realized that it's whats allowing the plaed cards to have a play_card method
  //I'm going to move this back to the displays for now
  

  //I wonder if I can turn this into a generator or yeil a value?
  tally(){
    let score = 0
    for(let card of this.cards){
      if(card.Victory_Points){ score += card.Victory_Points}
    }
    return score
  }
}

// let mydeck = new Deck(null, "mine")
// console.log(mydeck)

// if (typeof require != 'undefined' && require.main==module) {
//     fnName();
// }