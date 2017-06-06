import  React from "react"
import { Copper, Estate } from "./AllCards.js"
import { observable, computed, action } from "mobx"
import { DisplayCard } from "../componants/DisplayCard"
import store from "../../../store"

export class Deck {
  @observable cards = []
  
  constructor(card){
    this.cards = []
    if (card){
      for (let i = 0; i < card.PileCount(); i++){
        this.cards.push(card)
      }
    }
  
  }
  @computed get count(){
    return this.cards.length
  } 
  @action starter_deck(){
    for (let i = 0; i < 7; i ++){
      this.cards.push(new Copper())
    }
    for (let i = 0; i < 3; i ++){
      this.cards.push(new Estate())
    }
  }

  shuffle(){
    for(let i = 0; i <this.cards.length; i++){
      let j = Math.floor(Math.random()*this.cards.length)
      let temp = this.cards[j]
      this.cards[j] = this.cards[i]
      this.cards[i] = temp
    }
  }
  @action add_to(card){ this.cards.push(card)}

  draw(card = undefined){
    if(card == undefined){
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


  show =() =>{
    if(!this.cards) {return undefined}
    return this.cards.map((card , index) => {
      // console.log("deck thinks current player is", store.current_game.current_player)
      return (<div key ={index} onClick={() => store.current_game.current_player.play_card(card)}>
        {DisplayCard(card)} 
      </div>)
    }) 
  }
}
