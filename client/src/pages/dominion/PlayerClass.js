

class Player {
  constructor(name) {
    this.name = name
    this.actions = 1
    this.buys = 1
    this.coins = 0
    this.score = 0
    this.deck = new Deck
    this.hand = new Deck
    this.played = new Deck
    this.discard = new Deck
    this.deck.starter_deck()
    this.deck.shuffle()
  }

  tally_score(){
    this.score = 0
    var allcards = this.deck.cards.concat(this.hand.cards).concat(this.played.cards).concat(this.discard.cards)
    // console.log(this.name, "has these cards:", this.deck.cards)
    // console.log(allcards, "all the cards")
    for (var card of allcards){
      this.score += card.Victory_Points
    }
    return this.score
  }
  draw(deck){
    return deck.cards.pop()
  }
  draw_hand(){
    for (var i = 0; i < 5; i++){
      this.hand.cards.push(this.draw(this.deck))
    }
  }
  display_hand(){
    for (var card of this.hand.cards){
      $('.player_hand').append(display_card(card))
    }
  }
}


// var scottsdeck = new Deck
// scottsdeck.starter_deck()
// scottsdeck.shuffle()
