import React from "react"
import Body from "./Body"
import Footer from "./Footer"
import Header from "./Header"



export default class Layout extends React.Component {
    constructor(){
        super()
        this.name = "Scott"
    }

    render(){
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }


}