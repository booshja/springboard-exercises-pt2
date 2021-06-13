import React, { useState, useEffect } from "react";
// router
import Router from "./Router";
// custom hook
import useLocalStorage from "./hooks/useLocalStorage";
// api
import JoblyApi from "./api";
// context
import UserContext from "./context/UserContext";
// css
import "./assets/css/App.css";

function App() {
    // set up states
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [localStorageToken, setLocalStorageToken] = useLocalStorage();

    useEffect(() => {
        setToken(localStorageToken);
    }, [localStorageToken]);

    async function signup(userData) {
        // Send data to API to register user.
        let token = await JoblyApi.registerUser(userData);
        setLocalStorageToken(token);
        let user = await JoblyApi.getUser(userData.username);
        setUser(user);
    }

    async function login(username, password) {
        // Send data to API to authenticate user
        let token = await JoblyApi.loginUser(username, password);
        setLocalStorageToken(token);
        let user = await JoblyApi.getUser(username);
        setUser({ ...user });
    }

    async function update(username, userData) {
        /** Send data to API to update user */
        let user = await JoblyApi.updateUser(username, userData);
        setUser(user);
    }

    async function logout() {
        // Clear state and token on JoblyApi class to log out user
        await JoblyApi.logoutUser();
        setLocalStorageToken("");
        setUser(null);
    }

    return (
        <UserContext.Provider
            value={{ signup, login, logout, update, user, token }}
        >
            <Router />
        </UserContext.Provider>
    );
}

export default App;
