import React, { useState } from "react";

const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const toggleIsFacingUp = () => {
        setIsFacingUp((isUp) => !isUp);
    };

    return [isFacingUp, toggleIsFacingUp];
};

export { useFlip };
