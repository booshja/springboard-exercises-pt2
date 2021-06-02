import React from "react";
import "./Card.css";

const Card = ({ image, name }) => {
    return <img src={image} alt={name} className="Card" />;
};

export default Card;
