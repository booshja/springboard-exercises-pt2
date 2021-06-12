import { render } from "@testing-library/react";
import Signup from "./Signup";

/** Smoke Test */
it("renders without crashing", () => {
    render(<Signup />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<Signup />);
    expect(asFragment()).toMatchSnapshot();
});
