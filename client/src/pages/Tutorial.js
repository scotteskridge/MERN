import React from "react"
import Body from "./tutorial/Body"
import Footer from "./tutorial/Footer"
import Header from "./tutorial/Header"
import Data from "./tutorial/Data"
// import { BrowserRouter as Router, Link, Route} from "react-router-dom"


export default class Tutorial extends React.Component {
    constructor(){
        super()
        this.state = {
            title : "Welcome",
            name : "Scott"
        }
    }

    changeTitle(text){
        console.log(text)    
        this.setState({title : text})
        //that is the same as this.setState({title : title})

    }
    render(){
        // setTimeout(() => {
        //   this.setState({title : "Your Logged In"})
        // }, 3000)
        // const title = "Learning Props"
       

        return (
            <div>
                <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title}/>
               
                <Body />
                <Data changeTitle={this.changeTitle.bind(this)} title={this.state.title}/>
              
                <Footer />
            </div>
        )
    }


}