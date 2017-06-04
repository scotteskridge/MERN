import React from "react"
import { DisplayCard } from "../componants/DisplayCard"

export default class PlayerHand extends React.Component {
    constructor(props){
            super(props)
        }
    
   render() {
        if(this.props.hand){
            var cards_list = this.props.hand.cards.map((card , index) =>{
                return <div key ={index}>{DisplayCard(card)}</div>;
                        })
            return  (
                <div>
                    <ul className="basic">{ cards_list }</ul>
                </div>

            )
        }
        else {return null}
    }
}