import React from "react"
import store from "../../../store"
import { inject } from "mobx-react"

@inject("store")
export default class GameState extends React.Component {
// why dont I need to declare my vars here?
//would be nice to have the scores light up based on active player
	constructor(props){
		super(props)
		// console.log("Game state has props", this.props)
	}

	displayProp(){
		console.log("Current Game from injecting is:", this.props.store.current_game)
		console.log("Current phase is:", store.current_game.current_phase)
	}

	render(){
		let score_list = this.props.store.current_game.score_tally.map((score , index) =>{
            return <div key ={index}>{score.player} {score.score}</div>;
        })
        
		return (
			<div>
				<h4>The GameState</h4>
        <button className="ui button" onClick={this.displayProp.bind(this)}>Check Game State </button>

				<ul>
					<li> </li>
					<li>Current Player: {this.props.game.current_player.name} </li>
					<li>Current Phase: {this.props.game.current_phase} </li>
					<li>Current Turn: {this.props.game.turn} </li>
					<li>Piles until game end: {this.props.game.num_piles_to_end} </li>
					<li >{ score_list }</li>

				</ul>

		</div>
		)
	}
}