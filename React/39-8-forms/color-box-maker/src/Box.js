import React from "react";
import "./Box.css";

const Box = ({ color, width, height, id, removeBox }) => {
    // this component should display a div with a background color, width and height based on the props passed to it.
    return (
        <div className="Box" key={id} id={id}>
            <div
                style={{
                    backgroundColor: color,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
                className="Box--display"
            ></div>
            <button className="Box--removebtn" onClick={() => removeBox(id)}>
                X
            </button>
        </div>
    );
};

export default Box;
