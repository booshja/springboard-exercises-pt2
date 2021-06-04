import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ColorList from "./ColorList";
import NewColor from "./NewColor";
import Color from "./Color";

function App() {
    const [colors, setColors] = useState([
        { colorName: "black", colorValue: "#000000" },
    ]);

    const addColor = (newColor) => {
        setColors((colors) => [newColor, ...colors]);
    };

    const checkColor = (value) => {
        const check = colors.filter((c) => c.colorName === value);
        console.log("CHECK ===>>> " + check[0]);
        return check.length > 0 ? check[0] : false;
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/colors">
                    <ColorList colors={colors} />
                </Route>
                <Route exact path="/colors/new">
                    <NewColor colors={colors} addColor={addColor} />
                </Route>
                <Route path="/colors/:color">
                    <Color checkColor={checkColor} />
                </Route>
                <Redirect to="/colors" />
            </Switch>
        </div>
    );
}

export default App;
