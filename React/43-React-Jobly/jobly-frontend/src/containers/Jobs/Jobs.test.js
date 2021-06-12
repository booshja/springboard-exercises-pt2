import { render } from "@testing-library/react";
import Jobs from "./Jobs";

/** Smoke Test */
it("renders without crashing", () => {
    render(<Jobs />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<Jobs />);
    expect(asFragment()).toMatchSnapshot();
});
