import React from "react";

const Todo = ({ task, id, removeTodo }) => {
    // this component should display a div with the task of the todo.
    return (
        <div className="Todo" id={id} key={id}>
            <p className="Todo--task">{task}</p>
            <button onClick={() => removeTodo(id)} className="Todo--btn">
                X
            </button>
        </div>
    );
};

export default Todo;
