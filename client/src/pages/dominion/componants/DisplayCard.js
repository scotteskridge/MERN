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
            <div className="click ui button" >
                <ul className="card">
                    <li>Name: {card.Name}</li>
                    <li>Cost: {card.Cost}</li>
                    <li>Victory Points : {card.Victory_Points}</li>
                    <li>Type: {card.Type}</li>
                    <li>Description: {card.Description}</li>
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

