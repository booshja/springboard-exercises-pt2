import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// protected route wrapper
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";
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
                    <ProtectedRoute exact path="/companies">
                        <Companies />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/companies/:handle">
                        <CompanyPage />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/jobs">
                        <Jobs />
                    </ProtectedRoute>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoute exact path="/profile">
                        <Profile />
                    </ProtectedRoute>
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
