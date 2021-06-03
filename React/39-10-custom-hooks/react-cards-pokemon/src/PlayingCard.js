import React from "react";
import backOfCard from "./back.png";
import { useFlip } from "./hooks";
import "./PlayingCard.css";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
    const [isFacingUp, toggleIsFacingUp] = useFlip();
    return (
        <img
            src={isFacingUp ? front : back}
            alt="playing card"
            onClick={toggleIsFacingUp}
            className="PlayingCard Card"
        />
    );
}

export default PlayingCard;