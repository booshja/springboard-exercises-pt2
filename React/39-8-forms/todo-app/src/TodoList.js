import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

const TodoList = () => {
    // this component should render the NewTodoForm component and should render the list of Todo components. Place your state that contains all of the todos in this component.
    const INITIAL_STATE = [];

    const [todos, setTodos] = useState(INITIAL_STATE);

    const addTodo = (newTodo) => {
        setTodos((todos) => [...todos, { id: uuid(), ...newTodo }]);
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <h1>To Do List</h1>
            <NewTodoForm addTodo={addTodo} />
            <div className="TodoList--TodosContain">
                {todos.map(({ task, id }) => (
                    <Todo
                        id={id}
                        task={task}
                        removeTodo={removeTodo}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
