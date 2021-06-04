import React from "react";
import { Link, useParams } from "react-router-dom";
import "./DogDetails.css";

const DogDetails = ({ dogs, isMain }) => {
    let dog;
    const { dogName } = useParams();

    isMain
        ? (dog = dogs)
        : ([dog] = dogs.filter((dog) => dog.name === dogName));

    return (
        <>
            {!isMain && (
                <h1 className="DogDetails--headline">Meet {dog.name}!</h1>
            )}
            <div className={isMain ? "DogDetails" : "DogDetailsSolo"}>
                <h3 className="DogDetails--name">{dog.name}</h3>
                <img
                    className="DogDetails--img"
                    src={dog.src}
                    alt={`A doggo named ${dog.name}`}
                />
                {isMain === true ? (
                    <Link to={`/dogs/${dog.name}`} className="DogDetails--link">
                        See {dog.name}
                    </Link>
                ) : (
                    <>
                        <p className="DogDetails--age">Age: {dog.age}</p>
                        <ul className="DogDetails--factsList">
                            {dog.facts.map((fact, idx) => (
                                <li
                                    key={idx}
                                    className="DogDetails--factsList--fact"
                                >
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default DogDetails;
