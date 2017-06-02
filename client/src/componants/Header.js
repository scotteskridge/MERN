import React from "react"
import logo from './../static/logo.svg';
import Title from "./Header/Title"
import { BrowserRouter as Router, Link, Route} from "react-router-dom"

// import './../App.css';

export default class Header extends React.Component {
    constructor(props){
        super()
        this.props = props
    }

    // componentDidMount() {
    //     console.log("Header Rendered")
    //     this.props.changeTitle("New Title")
    // }
    handleChange(event){
        const title = event.target.value
        this.props.changeTitle(title)
    }

    
    render(){
        // this.props.changeTitle("New Title")
        // console.log(this.props)
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Title title = {this.props.title} />
                {/*<Link to ="/"> Route </Link>*/}
             </div>
        )
    }
}