import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// routes
import Companies from "./containers/Companies/Companies";
import CompanyPage from "./containers/CompanyPage/CompanyPage";
import Home from "./containers/Home/Home";
import Jobs from "./containers/Jobs/Jobs";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Signup from "./containers/Signup/Signup";
// components
import Navbar from "./components/Navbar/Navbar";

const Router = () => (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <main>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/companies">
                        <Companies />
                    </Route>
                    <Route exact path="/companies/:company">
                        <CompanyPage />
                    </Route>
                    <Route exact path="/jobs">
                        <Jobs />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
);

export default Router;
