import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DogList from "./DogList";
import DogDetails from "./DogDetails";
import Nav from "./Nav";
import whiskey from "./images/whiskey.jpg";
import duke from "./images/duke.jpg";
import perry from "./images/perry.jpg";
import tubby from "./images/tubby.jpg";
import "./App.css";

function App(props) {
    const dogs = props.dogs;
    const dogNames = props.dogs.map((dog) => dog.name);
    return (
        <>
            <Nav dogs={dogNames} />
            <Switch>
                <Route exact path="/dogs">
                    <DogList dogs={dogs} isMain={true} />
                </Route>
                <Route path="/dogs/:dogName">
                    <DogDetails dogs={dogs} isMain={false} />
                </Route>
                <Redirect to="/dogs" />
            </Switch>
        </>
    );
}

App.defaultProps = {
    dogs: [
        {
            name: "Whiskey",
            age: 5,
            src: whiskey,
            facts: [
                "Whiskey loves eating popcorn.",
                "Whiskey is a terrible guard dog.",
                "Whiskey wants to cuddle with you!",
            ],
        },
        {
            name: "Duke",
            age: 3,
            src: duke,
            facts: [
                "Duke believes that ball is life.",
                "Duke likes snow.",
                "Duke enjoys pawing other dogs.",
            ],
        },
        {
            name: "Perry",
            age: 4,
            src: perry,
            facts: [
                "Perry loves all humans.",
                "Perry demolishes all snacks.",
                "Perry hates the rain.",
            ],
        },
        {
            name: "Tubby",
            age: 4,
            src: tubby,
            facts: [
                "Tubby is really stupid.",
                "Tubby does not like walks.",
                "Angelina used to hate Tubby, but claims not to anymore.",
            ],
        },
    ],
};

export default App;
