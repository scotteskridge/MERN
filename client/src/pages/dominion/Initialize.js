function build_board(){
  assign_treasure()
  assign_victory()
  choose_actions()
  assign_action()
}

function make_card(cardname){
  return new cardname
}

function choose_actions(){
  var action_list = new Deck
  var listOfCardClasses = [Village, Cellar, Chapel, Moat, Chancellor, Woodcutter, Workshop, Feast, Militia, Witch, Moneylender, Smithy, Throneroom, Festival, Laboratory, Laboratory2, Laboratory3, Laboratory4]
  for (let cardClass of listOfCardClasses) {
    action_list.cards.push(new cardClass)
  }
  // for (var card of list){
  //   action_list.cards.push(make_card(card))
  // }

  action_list.shuffle()
  action_list.cards.length = 10
  return action_list.cards

}

function display_card(card){
  return `<div class="click " >
            <ul class = "card">
              <li>Name: ${card.Name}</li>
              <li>Cost: ${card.Cost}</li>
              <li>Victory Points : ${card.Victory_Points}</li>
              <li>Type: ${card.Type}</li>
              <li>Description: ${card.Description}</li>
            </ul>
          </div>`

}

var card =  `<div class="click " >
              <ul class = "card">
                <li>Name: Copper</li>
                <li>Cost: 1</li>
                <li>Victory Points : 0</li>
                <li>Type: Treasure</li>
                <li>Description: A copper gives 1 coin</li>
              </ul>
            </div>`

function display_pile(card){
  return `<div class="click " >
            <ul class = "card">
              <li>Name: ${card.Name}</li>
              <li>Cost: ${card.Cost}</li>
              <li>Victory Points : ${card.Victory_Points}</li>
              <li>Type: ${card.Type}</li>
              <li>Description: ${card.Description}</li>
            </ul>
            <span class = "counter">
              ${card.PileCount()}
            </span>
          </div>`
}



function assign_treasure(){
  var copper = new Copper
  var silver = new Silver
  var gold = new Gold
  //display card translates it to HTML but I need to actually make the objects and assign a counter to each div
  $('.treasure').append(display_pile(copper))
  $('.treasure').append(display_pile(silver))
  $('.treasure').append(display_pile(gold))

}

function assign_victory(){
  var estate = new Estate
  var duchy = new Duchy
  var province = new Province
  $('.victory').append(display_pile(estate))
  $('.victory').append(display_pile(duchy))
  $('.victory').append(display_pile(province))
}

var village = new Village

function assign_action(){
  card_list = choose_actions()
  for (var card of card_list){
    // var test_pile = new Deck(make_card(card_list[ind]))
    // console.log(test_pile, test_pile.cards.length)
    $('.action').append(display_pile(card))
  }

}
