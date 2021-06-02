import React, { useState } from "react";

const NewTodoForm = ({ addTodo }) => {
    // this component should render a form with one text input for the task to be created. When this form is submitted, a new Todo component should be created.
    const INITIAL_STATE = {
        task: "",
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
        addTodo({ ...formData });
        setFormData(INITIAL_STATE);
    };

    return (
        <form onSubmit={handleSubmit} className="NewTodoForm">
            <label htmlFor="task" className="NewTodoForm--label">
                New Todo:
            </label>
            <input
                id="task"
                type="text"
                name="task"
                placeholder="New Todo"
                value={formData.task}
                onChange={handleChange}
                className="NewTodoForm--task"
            />
            <button className="NewTodoForm--btn">Add Todo</button>
        </form>
    );
};

export default NewTodoForm;
