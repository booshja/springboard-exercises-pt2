import { useState, useEffect } from "react";
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
    const [baseUrl, setBaseUrl] = useState(null);

    useEffect(() => {
        setBaseUrl(url);
    }, [url]);

    const addData = async (urlSuffix = "") => {
        const res = await axios.get(baseUrl + urlSuffix);
        setData((data) => [...data, { ...res.data, id: uuid() }]);
    };

    return [data, addData];
};

export { useFlip, useAxios };
