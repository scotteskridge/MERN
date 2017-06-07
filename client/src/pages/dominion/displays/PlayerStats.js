import React from "react"
import { observer, inject } from "mobx-react"

//ducky - i want this class to display the player stats for right now it can just be styled as a div
//with all of the relevent playerstats
@inject("store") @observer
export default class PlayerStats extends React.Component {
    
    render(){
        if(!this.props.player){return null }
        return (
            <div>
                <h4>{this.props.player.name} </h4>
                <p>Actions: {this.props.player.actions} </p>
                <p>Buys: {this.props.player.buys} </p>
                <p>Coins: {this.props.player.coins} </p>

            </div>
        )
    }
}