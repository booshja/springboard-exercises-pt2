import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardDisplay.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const CardDisplay = () => {
    const [deckId, setDeckId] = useState("new");
    const [cards, setCards] = useState([]);

    const drawCard = async () => {
        const res = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
        setCards([...cards, res.data.cards[0]]);
    };

    useEffect(() => {
        async function getDeckId() {
            const res = await axios.get(
                `${BASE_URL}/new/shuffle/?deck_count=1`
            );
            setDeckId(res.data.deck_id);
        }
        getDeckId();
    }, []);

    const showCards = cards.map((card) => {
        return (
            <Card
                key={card.code}
                name={`${card.value} OF ${card.suit}`}
                image={card.image}
            />
        );
    });

    return (
        <div className="CardDisplay">
            <button onClick={drawCard} className="CardDisplay--btn">
                GIMME A CARD!
            </button>
            <div className="CardDisplay--cards">{showCards}</div>
        </div>
    );
};

export default CardDisplay;
