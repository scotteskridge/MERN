import React from "react"

export default class GameState extends React.Component {
// why dont I need to declare my vars here?
//would be nice to have the scores light up based on active player
	constructor(props){
		super(props)
		console.log("Game state has props", this.props)
	}

	displayProp(){
		console.log("Game state has props", this.props)
	}

	render(){
		let score_list = this.props.game.score_tally.map((score , index) =>{
            return <div key ={index}>{score.player} {score.score}</div>;
        })
        
		return (
			<div>
				<h4>The GameState</h4>
        <button className="ui button" onClick={this.displayProp.bind(this)}>displayProp </button>

				<ul>
					<li> </li>
					<li>Current Player: {this.props.game.current_player.name} </li>
					<li>Current Phase: {this.props.game.current_phase} </li>
					<li >{ score_list }</li>

				</ul>

		</div>
		)
	}
}