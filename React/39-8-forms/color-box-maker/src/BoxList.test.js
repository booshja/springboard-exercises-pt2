import React from "react";
import { render } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", () => {
    render(<BoxList />);
});

it("matches snapshots", () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});
