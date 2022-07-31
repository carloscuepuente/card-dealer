import React, { Component } from 'react'
import Card from "./Card"
import axios from "axios"
import "./Deck.css"

export default class Deck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deckId: "",
            cardRemainig: "",
            deatlCards: [
                // { [{ "code": "4D", "image": "https://deckofcardsapi.com/static/img/4D.png", "images": { "svg": "https://deckofcardsapi.com/static/img/4D.svg", "png": "https://deckofcardsapi.com/static/img/4D.png" }, "value": "4", "suit": "DIAMONDS" }], "remaining": 51 }
            ]
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        // let response = await axios.get("https://deckofcardsapi.com/api/deck/new/");
        let response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        // console.log(response)
        const data = response.data;
        this.setState({
            deckId: data.deck_id,
            cardRemainig: data.remaining

        })
    };

    componentDidUpdate() {

    }

    displayCards() {
        return (
            this.state.deatlCards.map(card => (
                <Card key={card.code} image={card.image} alt={card.code} />
            )
            ))
    };


    async drawCard() {
        const deckId = this.state.deckId;
        try {
            let cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
            if (cardResponse.data.error) {
                throw new Error("No cards in deck")
            }

            const data = cardResponse.data;
            let cardInfo = {
                code: data.cards[0].code,
                image: data.cards[0].image
            };

            // console.log(cardInfo)
            this.setState({
                cardRemainig: data.remaining,
                deatlCards: [...this.state.deatlCards, cardInfo]
            })
        } catch (err) {
            alert(err)
        }

    };


    handleClick() {
        // alert("handling click")
        this.drawCard()

    };

    render() {
        return (
            <div className='Deck'>

                <h1 className='Deck-title'>The Card Dealer</h1>
                <h2 className='Deck-title subtitle'>React demo app using an api request to https://www.deckofcardsapi.com/</h2>
                <button className='Deck-btn' onClick={this.handleClick} >Draw a Card from the deck</button>
                <div className='Deck-cardArea'>
                    {this.displayCards()}
                </div>


            </div>
        )
    }
}
