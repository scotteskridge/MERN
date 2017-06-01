import React from "react"

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
            </div>
        )
    }
}