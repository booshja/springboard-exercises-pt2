import React from "react";
import "./Pokecard.css";

const Pokecard = ({ name, id, type, exp }) => {
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <div className="Pokecard">
            <h2 className="Pokecard-name">{name}</h2>
            <img src={imgUrl} alt="pokemon" className="Pokecard-img" />
            <p className="Pokecard-details">Type: {type}</p>
            <p className="Pokecard-details">EXP: {exp}</p>
        </div>
    );
};

export default Pokecard;
