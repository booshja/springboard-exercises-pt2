import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardDisplay.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const CardDisplay = () => {
    const [deckId, setDeckId] = useState("new");
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        try {
            async function getDeckId() {
                let res = await axios.get(
                    `${BASE_URL}/new/shuffle/?deck_count=1`
                );
                setDeckId(res.data.deck_id);
            }
            getDeckId();
        } catch (err) {
            console.log(err);
        }
    }, [setDeckId]);

    useEffect(() => {
        async function drawCard() {
            try {
                let drawRes = await axios.get(`${BASE_URL}/${deckId}/draw/`);

                if (drawRes.data.remaining === 0) {
                    setAutoDraw(false);
                    throw new Error("no cards remaining!");
                }

                const card = drawRes.data.cards[0];

                setCards((cards) => [
                    ...cards,
                    {
                        id: card.code,
                        name: `${card.suit} OF ${card.value}`,
                        image: card.image,
                    },
                ]);
            } catch (err) {
                console.log(err);
            }
        }

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await drawCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [autoDraw, setAutoDraw, cards, deckId]);

    const toggleAutoDraw = () => setAutoDraw(!autoDraw);

    const showCards = cards.map((c) => {
        return <Card key={c.id} name={c.name} image={c.image} />;
    });

    return (
        <div className="CardDisplay">
            {deckId ? (
                <button onClick={toggleAutoDraw} className="CardDisplay--btn">
                    {autoDraw ? "STOP DRAWING" : "START DRAWING"}
                </button>
            ) : null}
            <div className="CardDisplay--cards">{showCards}</div>
        </div>
    );
};

export default CardDisplay;
