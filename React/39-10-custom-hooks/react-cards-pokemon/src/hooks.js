import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const toggleIsFacingUp = () => {
        setIsFacingUp((isUp) => !isUp);
    };

    return [isFacingUp, toggleIsFacingUp];
};

const useAxios = (url) => {
    const [data, setData] = useState([]);
    const addData = async () => {
        const res = await axios.get(url);
        setData((data) => [...data, { ...res.data, id: uuid() }]);
    };
    return [data, addData];
};

export { useFlip, useAxios };
