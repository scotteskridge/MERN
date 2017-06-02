class Deck {
  constructor(card = []){
    this.cards = []
    if (card){
      for (var i in card.PileCount){
        this.cards.push(card)
      }
    }
    this.count;
  }
  starter_deck(){
    for (var i = 0; i < 7; i ++){
      this.cards.push(new Copper)
    }
    for (var i = 0; i < 3; i ++){
      this.cards.push(new Estate)
    }
  }

  shuffle(){
    for(var i = 0; i <this.cards.length; i++){
      var j = Math.floor(Math.random()*this.cards.length)
      var temp = this.cards[j]
      this.cards[j] = this.cards[i]
      this.cards[i] = temp
    }
  }

  draw(){
    return this.cards.pop()
  }
}
