import { render } from "@testing-library/react";
import CardDisplay from "./CardDisplay";

// Smoke test
it("renders without crashing", () => {
    render(<CardDisplay />);
});

// Snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<CardDisplay />);
    expect(asFragment()).toMatchSnapshot();
});
