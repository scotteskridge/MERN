import React from 'react'
// import { Card, Icon } from 'semantic-ui-react'
// import { Copper } from "./cards"


// const card = new Copper
   
// I'm pretty sure I can just do away with this and simply make a helper function

// export class CardComp extends React.Component{
//     constructor(props){
//         super(props)
//         this.card = this.props.card
//     }

export function DisplayCard(card) {
        return (
            <div className="click ui button " >
                <ul className="card">
                    <li>Name: {card.name}</li>
                    <li>Cost: {card.cost}</li>
                    <li>Victory Points : {card.victory_points}</li>
                    <li>Type: {card.type}</li>
                    <li>Description: {card.description}</li>
                </ul>
            </div>
            
            )}


//     render(){
//         return(
//             DisplayCard({card})
//         )   
//     }
// }


export function TestFunction(){
    return (
        <div>
            <p> a test stand alone funciton </p>
        </div>
      )
  }

