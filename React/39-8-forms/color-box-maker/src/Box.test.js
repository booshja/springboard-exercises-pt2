import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

it("renders without crashing", () => {
    // TODO: Add props
    render(<Box color="" width="" height="" />);
});

it("matches snapshots", () => {
    // TODO: Add props
    const { asFragment } = render(<Box color="" width="" height="" />);
    expect(asFragment()).toMatchSnapshot();
});
