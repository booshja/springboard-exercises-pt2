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
    // set up states, useLocalStorage custom hook
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [applications, setApplications] = useState([]);
    const [localStorageToken, setLocalStorageToken] = useLocalStorage();

    useEffect(() => {
        setToken(localStorageToken);
    }, [localStorageToken]);

    async function signup(userData) {
        /** Send data to API to register user. */
        let token = await JoblyApi.registerUser(userData);
        setLocalStorageToken(token);
        let user = await JoblyApi.getUser(userData.username);
        setUser(user);
    }

    async function login(username, password) {
        /** Send data to API to authenticate user */
        let token = await JoblyApi.loginUser(username, password);
        setLocalStorageToken(token);
        let user = await JoblyApi.getUser(username);
        setUser({ ...user });
        setApplications(user.applications);
    }

    async function update(username, userData) {
        /** Send data to API to update user */
        let user = await JoblyApi.updateUser(username, userData);
        setUser(user);
    }

    async function apply(username, id) {
        /** Send data to API to apply user for job */
        let jobId = await JoblyApi.applyToJob(username, id);
        setApplications((apps) => [jobId, ...apps]);
    }

    async function logout() {
        /** Clear state and token on JoblyApi class to log out user */
        await JoblyApi.logoutUser();
        setLocalStorageToken(null);
        setUser(null);
        setApplications([]);
    }

    return (
        <UserContext.Provider
            value={{
                signup,
                login,
                logout,
                update,
                apply,
                applications,
                user,
                token,
            }}
        >
            <Router />
        </UserContext.Provider>
    );
}

export default App;
