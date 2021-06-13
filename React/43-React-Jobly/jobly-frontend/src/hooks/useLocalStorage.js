import { useState, useEffect } from "react";

const useLocalStorage = () => {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(window.localStorage.getItem("token"));
        } catch (e) {
            console.log(e);
            value = "";
        }
        return value;
    });

    useEffect(() => {
        window.localStorage.setItem("token", state);
    }, [state]);

    return [state, setState];
};

export default useLocalStorage;
