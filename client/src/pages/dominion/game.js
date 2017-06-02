// finish getting the game state setup with a player haveing 10 cards and be abel to display and draw those cards to hand
var game_over = false
var initialize = false



var players = []
var player_num = 0
var current_player;
var num_of_players = 0
var phase = ["Action" , "Buy" , "Cleanup"]
var current_phase = 0

if (!game_over){
  console.log("Game Over the winner is Scott")
}

function next_player(){
  player_num +=1
  if (player_num == players.length){
    player_num = 0
  }
  $('#current_player').html(current_player.name)
  $('#deck_count').html(current_player.deck.length)
  $('#discard_count').html(current_player.discard.length)
  $('#actions').html(current_player.actions)
  $('#buys').html(current_player.buys)
  $('#coins').html(current_player.coins)
  current_player = players[player_num]
  current_player.draw_hand()
  current_player.display_hand()
  return player_num
}

function next_phase(){
  current_phase +=1
  if (current_phase == phase.length){
    current_phase = 0
  }
  return current_phase
}
var turn_counter = 0
function action_phase(){
  console.log("It's the action phase")
  next_phase()
}
function buy_phase(){
  console.log("It's the buy phase")
  next_phase()
}
function cleanup_phase(){
  console.log("It's the cleanup phase")
  next_phase()
  next_player()
  turn_counter += 1
  if (turn_counter > 4){
    game_over = true
  }
}
function update_score(){
  for (var player of players){
    player.tally_score()
    var list_item = (`<li>${player.name}'s score: ${player.score}</li>`)
    $('#score_board').append(list_item)
  }
}
function display_winner(){
  var winner = current_player;
  for (var player of players){
    if (player.score > winner.score){
      winner = player
    }
  }
  alert(`${winner.name} is the winner!`)
}










$(document).ready(function(){
  build_board()

  //initialize the game state
  if (initialize){
    //create new players on game start
    num_of_players = prompt("Please enter the number of new players:")
    for (var i = 0; i < num_of_players; i++){
      var name = prompt("Please enter the players name:")
      var player = new Player(name)
      players.push(player)
    }
    //populate the html
    current_player = players[player_num]
    $('#current_player').html(current_player.name)
    $('#current_phase').html(phase[current_phase])
    $('#deck_count').html(current_player.deck.length)
    $('#discard_count').html(current_player.discard.length)
    $('#actions').html(current_player.actions)
    $('#buys').html(current_player.buys)
    $('#coins').html(current_player.coins)
    update_score()
    current_player.draw_hand()
    current_player.display_hand()

  }
  else {
    //this is purely for debugging
    num_of_players = 4
    for (var i = 0; i < num_of_players; i++){
      var name = `player${i}`
      var player = new Player(name)
      players.push(player)
    }
    current_player = players[player_num]
    $('#current_player').html(current_player.name)
    $('#current_phase').html(phase[current_phase])
    $('#deck_count').html(current_player.deck.length)
    $('#discard_count').html(current_player.discard.length)
    $('#actions').html(current_player.actions)
    $('#buys').html(current_player.buys)
    $('#coins').html(current_player.coins)
    update_score()
    current_player.draw_hand()
    current_player.display_hand()
  }

  //stay in game loop until game_over is true
while (!game_over){
  action_phase()
  buy_phase()
  cleanup_phase()
}
update_score()
display_winner()

  //advance phase
  $('#next_phase').click(function(){
    next_phase()
    $('#current_phase').html(phase[current_phase])
  })

  //once game_over is true tally score and display winner

  // display players turn
  $('#current_player').click(function(){
    next_player()
    $('#current_player').html(current_player.name)
  });

  //count donw cards as you buy from piles
  var card_count = 10;
  var countDisplay = $('.coppers')
  var clickme = $('.click')
  clickme.click(function(){
    card_count -= 1;
    countDisplay.html(card_count)

  $('.card').click(function(){
    console.log($(this))
  });
  });
});
