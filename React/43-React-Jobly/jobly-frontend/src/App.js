import React, { useState } from "react";
import Router from "./Router";
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

    async function signup(userData) {
        // Send data to API to register user.
        let token = await JoblyApi.registerUser(userData);
        setToken(token);
        let user = await JoblyApi.getUser(userData.username);
        setUser(user);
    }

    async function login(username, password) {
        // Send data to API to authenticate user
        let token = await JoblyApi.loginUser(username, password);
        setToken(token);
        let user = await JoblyApi.getUser(username);
        setUser(user);
    }

    async function update(userData) {
        /** Send data to API to update user */
        let user = await JoblyApi.updateUser(userData);
        setUser(user);
    }

    async function logout() {
        // Clear state and token on JoblyApi class to log out user
        await JoblyApi.logout();
        setToken("");
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
