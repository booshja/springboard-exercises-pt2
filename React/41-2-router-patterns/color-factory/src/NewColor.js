import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewColor.css";

const NewColor = ({ addColor }) => {
    const INITIAL_STATE = {
        colorName: "",
        colorValue: "#000000",
    };
    const history = useHistory();
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor({ ...formData });
        setFormData(INITIAL_STATE);
        history.push("/colors");
    };

    return (
        <div className="NewColor">
            <form onSubmit={handleSubmit} className="NewColor--form">
                <label htmlFor="colorName" className="NewColor--form--label">
                    Color Name:
                </label>
                <input
                    id="colorName"
                    type="text"
                    name="colorName"
                    placeholder="New Color Name"
                    value={formData.colorName}
                    onChange={handleChange}
                    className="NewColor--form--textInput"
                />
                <label htmlFor="colorValue" className="NewColor--form--label">
                    Color Code:
                </label>
                <input
                    id="colorValue"
                    type="color"
                    name="colorValue"
                    value={formData.colorValue}
                    onChange={handleChange}
                    className="NewColor--form--colorInput"
                />
                <button className="NewColor--form--btn">Add New Color</button>
            </form>
        </div>
    );
};

export default NewColor;
