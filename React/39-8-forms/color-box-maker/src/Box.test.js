import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

it("renders without crashing", () => {
    render(<Box color="green" width={100} height={100} id={7} />);
});

it("matches snapshots", () => {
    const { asFragment } = render(
        <Box color="green" width={100} height={100} id={7} />
    );
    expect(asFragment()).toMatchSnapshot();
});
