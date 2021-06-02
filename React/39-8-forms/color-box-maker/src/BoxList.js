import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";
import "./BoxList.css";

const BoxList = () => {
    // Place your state that contains all of the boxes here. This component should render all of the Box components along with the NewBoxForm component
    const INITIAL_STATE = [];

    const [boxes, setBoxes] = useState(INITIAL_STATE);

    const addBox = (newBox) => {
        setBoxes((boxes) => [...boxes, { id: uuid(), ...newBox }]);
    };

    const removeBox = (id) => {
        setBoxes(boxes.filter((box) => box.id !== id));
    };

    return (
        <div className="BoxList">
            <NewBoxForm addBox={addBox} />
            <div className="BoxList--BoxContain">
                {boxes.map(({ color, width, height, id }) => (
                    <Box
                        id={id}
                        color={color}
                        width={width}
                        height={height}
                        removeBox={removeBox}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoxList;
