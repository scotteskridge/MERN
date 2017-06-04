import React from "react"
import { DisplayCard } from "../componants/DisplayCard"
// import { Copper } from "../componants/cards"
export default class ActionCards extends React.Component {
    //I'm not sure where to use state and where to use an atribute variable
    //sounds like state is for when I want to update a render?
    
    constructor(props){
        super(props)
        // console.log("Actions cards has this props.cards", this.props.cards )

    }

    

    render() {
        
        let cards_list = this.props.cards.map((card , index) =>{
            return <div key ={index}>{DisplayCard(card)}</div>;
        })
        
        return  (
            <div >
                <ul className="action">{ cards_list }</ul>
            </div>
        )
    }
}