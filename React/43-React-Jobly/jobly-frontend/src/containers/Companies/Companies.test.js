import { render } from "@testing-library/react";
import Companies from "./Companies";

/** Smoke Test */
it("renders without crashing", () => {
    render(<Companies />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<Companies />);
    expect(asFragment()).toMatchSnapshot();
});
