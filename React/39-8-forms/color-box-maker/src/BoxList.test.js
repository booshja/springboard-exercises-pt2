import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", () => {
    render(<BoxList />);
});

it("matches snapshots", () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("should add a colored square", () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
        <BoxList />
    );
    const colorInput = getByPlaceholderText("Background Color");
    const widthInput = getByPlaceholderText("Box Width");
    const heightInput = getByPlaceholderText("Box Height");
    const btn = getByText("Add Box");

    expect(queryByText("X")).not.toBeInTheDocument();

    fireEvent.change(colorInput, { target: { value: "green" } });
    fireEvent.change(widthInput, { target: { value: 100 } });
    fireEvent.change(heightInput, { target: { value: 100 } });
    fireEvent.click(btn);

    expect(getByText("X")).toBeInTheDocument();
});

it("should clear inputs after submission", () => {
    const { getByPlaceholderText, getByText } = render(<BoxList />);
    const colorInput = getByPlaceholderText("Background Color");
    const widthInput = getByPlaceholderText("Box Width");
    const heightInput = getByPlaceholderText("Box Height");
    const btn = getByText("Add Box");

    fireEvent.change(colorInput, { target: { value: "green" } });
    fireEvent.change(widthInput, { target: { value: 100 } });
    fireEvent.change(heightInput, { target: { value: 100 } });

    fireEvent.click(btn);

    expect(colorInput.value).toEqual("");
    expect(widthInput.value).toEqual("");
    expect(heightInput.value).toEqual("");
});
