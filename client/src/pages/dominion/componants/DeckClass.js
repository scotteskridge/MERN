import { Copper, Estate } from "./cards.js"

export class Deck {
  constructor(card){
    this.cards = []
    if (card){
      for (let i = 0; i < card.PileCount(); i++){
        this.cards.push(card)
      }
    }
    this.count = this.cards.length;
  }
  starter_deck(){
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

  draw(){
    return this.cards.pop()
  }
}
