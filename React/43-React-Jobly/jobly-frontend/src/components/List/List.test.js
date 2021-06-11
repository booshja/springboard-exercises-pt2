import { render } from "@testing-library/react";
import List from "./List";

/** Smoke Test */
it("renders without crashing", () => {
    render(<List />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<List />);
    expect(asFragment()).toMatchSnapshot();
});
