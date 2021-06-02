import React, { useState } from "react";
import "./NewBoxForm.css";

const NewBoxForm = ({ addBox }) => {
    // this component should render a form that when submitted, creates a new Box. You should be able to specify the Box’s width, height, and background color. When the form is submitted, clear the input values.

    const INITIAL_STATE = {
        width: "",
        height: "",
        color: "",
    };
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
        addBox({ ...formData });
        setFormData(INITIAL_STATE);
    };

    return (
        <form onSubmit={handleSubmit} className="NewBoxForm">
            <label htmlFor="color" className="NewBoxForm--label">
                Background Color:
            </label>
            <input
                id="color"
                type="text"
                name="color"
                placeholder="Background Color"
                value={formData.color}
                onChange={handleChange}
                className="NewBoxForm--input"
            />
            <label htmlFor="width" className="NewBoxForm--label">
                Box Width:
            </label>
            <input
                id="width"
                type="text"
                name="width"
                placeholder="Box Width"
                value={formData.width}
                onChange={handleChange}
                className="NewBoxForm--input"
            />
            <label htmlFor="height" className="NewBoxForm--label">
                Box Width:
            </label>
            <input
                id="height"
                type="text"
                name="height"
                placeholder="Box Height"
                value={formData.height}
                onChange={handleChange}
                className="NewBoxForm--input"
            />
            <button className="NewBoxForm--btn">Add Box</button>
        </form>
    );
};

export default NewBoxForm;
