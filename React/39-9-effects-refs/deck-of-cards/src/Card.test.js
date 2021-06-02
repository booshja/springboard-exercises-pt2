import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test
it("renders without crashing", () => {
    render(<Card />);
});

// Snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
