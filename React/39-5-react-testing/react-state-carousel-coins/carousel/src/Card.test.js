import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", () => {
    render(
        <Card
            caption="This is a test"
            src="source.jpg"
            currNum="1"
            totalNum="2"
        />
    );
});

it("should match snapshot", () => {
    const { asFragment } = render(
        <Card
            caption="This is a test"
            src="source.jpg"
            currNum="1"
            totalNum="2"
        />
    );
    expect(asFragment()).toMatchSnapshot();
});
