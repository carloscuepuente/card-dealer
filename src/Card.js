import React, { Component } from 'react'
import "./Card.css"

export default class Card extends Component {

    constructor(props) {
        super(props)

        let angle = Math.random() * 90 - 60;
        let xPos = Math.random() * 40 - 30;
        let yPos = Math.random() * 40 - 35;
        // aqui se esta agregando esta variable al componente como tal
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
    }




    render() {
        // si dejo esto aqui cada vez que hay un re render se cambian todas las cartas
        // let angle = Math.random() * 90 - 60;
        // let xPos = Math.random() * 40 - 30;
        // let yPos = Math.random() * 40 - 35;
        // let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
        return (
            <img style={{ transform: this._transform }} className='Card' src={this.props.image} alt={this.props.alt} />

        )
    }
}
