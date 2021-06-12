import { render } from "@testing-library/react";
import Login from "./Login";

/** Smoke Test */
it("renders without crashing", () => {
    render(<Login />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
});
