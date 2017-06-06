import React from "react"
import { DisplayCard } from "../componants/DisplayCard"
import { observer, inject } from "mobx-react"

@inject("store") @observer
export default class PlayerHand extends React.Component {
    constructor(props){
            super(props)
        }
        
    
   render() {
        if(!this.props.hand){return null}
        // console.log("when does the player hand render?")
        let cards_list = this.props.hand.show()
        // console.log(cards_list)
        return  (
            <div>
                <ul className="basic">{ cards_list }</ul>
            </div> 
        )     
    }
}