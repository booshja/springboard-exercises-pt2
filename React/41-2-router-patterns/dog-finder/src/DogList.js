import React from "react";
import DogDetails from "./DogDetails";
import "./DogList.css";

const DogList = ({ dogs, isMain }) => {
    return (
        <div className="DogList">
            <h1 className="DogList--headline">Here are our dogs!</h1>
            <div className="DogList--dogs">
                {dogs.map((dog) => (
                    <DogDetails key={dog.name} dogs={dog} isMain={isMain} />
                ))}
            </div>
        </div>
    );
};

export default DogList;
