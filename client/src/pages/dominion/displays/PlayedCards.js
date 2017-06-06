import React from "react"
import { observer, inject } from "mobx-react"

@inject("store") @observer
export default class PlayedCards extends React.Component {
    
    constructor(props){
            super(props)
        }

    render() {
        if(!this.props.played){return null}
        let cards_list = this.props.played.show()
        return  (
            <div>
                <ul className="basic">{ cards_list }</ul>
            </div>

            )
          
    }
}