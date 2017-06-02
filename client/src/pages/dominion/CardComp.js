import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
// import copper from '../../static/assets/Copper.jpg' //not sure why this doesnt work

const card = {
    Name : "Copper",
    cost: 1,
    Victory_Points: 0,
    Type: "Treasure",
    Description: "its a copper"

}
   

export class CardComp extends React.Component{
    constructor(){
        super()
    }

    DisplayCard({card}) {
        return (
            
            <ul className="card">
                <li>Name: {card.Name}</li>
                <li>Cost: {card.Cost}</li>
                <li>Victory Points : {card.Victory_Points}</li>
                <li>Type: {card.Type}</li>
                <li>Description: {card.Description}</li>
            </ul>
            
            )}


    render(){
        return(
            <div className="click ui button" >
            {this.DisplayCard({card})}
          </div>
        )   
    }
}


export function TestFunction(){
    return (
        <div>
            <p> a test stand alone funciton </p>
        </div>
      )
  }

