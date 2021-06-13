import { useState, useEffect } from "react";

const useLocalStorage = () => {
    // set up state
    const [state, setState] = useState(() => {
        // get initial state from localStorage if present
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
        // when the state changes, set the localStorage
        window.localStorage.setItem("token", state);
    }, [state]);

    return [state, setState];
};

export default useLocalStorage;
