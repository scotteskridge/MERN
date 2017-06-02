import React from "react"
import { DisplayCard } from "../componants/DisplayCard"
// import { Copper } from "../componants/cards"
export default class BaseCards extends React.Component {
    //I'm not sure where to use state and where to use an atribute variable
    //sounds like state is for when I want to update a render?
    cards = []
    constructor(props){
        super(props)
        this.cards= this.props.cards
        // console.log("Base cards has this props.cards", this.props.cards )

    }

    

    render() {
        
        var cards_list = this.cards.map((card , index) =>{
                        console.log("trying to loop through 3 coppers", card)
                        return <li key ={index}>{DisplayCard(card)}</li>;
                      })
        console.log (cards_list)

        return  (
            <div>
                <ul>{ cards_list }</ul>
            </div>
        )
    }
}