import { render } from "@testing-library/react";
import Profile from "./Profile";

/** Smoke Test */
it("renders without crashing", () => {
    render(<Profile />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot();
});
