import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", () => {
    render(<TodoList />);
});

it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("should add a todo", () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
        <TodoList />
    );
    const taskInput = getByPlaceholderText("New Todo");
    const btn = getByText("Add Todo");

    expect(queryByText("X")).not.toBeInTheDocument();

    fireEvent.change(taskInput, { target: { value: "Walk dogs" } });
    fireEvent.click(btn);

    expect(getByText("X")).toBeInTheDocument();
});

it("should clear inputs after submission", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const taskInput = getByPlaceholderText("New Todo");
    const btn = getByText("Add Todo");

    fireEvent.change(taskInput, { target: { value: "Defragment Computer" } });

    fireEvent.click(btn);

    expect(taskInput.value).toEqual("");
});
