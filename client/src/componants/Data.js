import React from "react"
import { Button } from 'semantic-ui-react'
import ModalExampleDimmer from "./Modals/DimmerModal"

export default class Data extends React.Component {
    constructor(props){
        super()
        this.props = props
        this.state = props
    }
    handleChange(event){
        const title = event.target.value
        this.props.changeTitle(title)
    }

   
    render(){
        return (
            <div>
                <input value={this.props.title} onChange = {this.handleChange.bind(this)} />
                <p>Can you show up here too? {this.props.title} </p>
                <Button  className="ui circular button">Semantic?</Button>
               
                <div>
                <div className="ui buttons">
                    <button className="ui icon button">
                <i aria-hidden="true" className="align left icon"></i> </button>
                    <button className="ui icon button">
                <i aria-hidden="true" className="align center icon"></i> </button>
                    <button className="ui icon button">
                <i aria-hidden="true" className="align right icon"></i> </button>
                    <button className="ui icon button">
                <i aria-hidden="true" className="align justify icon"></i> </button>
                </div>
                <div className="ui buttons">
                    <button className="ui icon button">
                <i aria-hidden="true" className="bold icon"></i> </button>
                    <button className="ui icon button">
                <i aria-hidden="true" className="underline icon"></i> </button>
                    <button className="ui icon button">
                <i aria-hidden="true" className="text width icon"></i> </button>
                </div>
                </div>
                <ModalExampleDimmer />
                

            </div>
        )
    }
}