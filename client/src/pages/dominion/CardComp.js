import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
// import copper from '../../static/assets/Copper.jpg' //not sure why this doesnt work

const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
)

export default class CardComp extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className = "card">
                <Card
                    image="./na.jpg"
                    header='Elliot Baker'
                    meta='Friend'
                    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                    extra={extra}
                />
        </div>
        )   
    }
}

