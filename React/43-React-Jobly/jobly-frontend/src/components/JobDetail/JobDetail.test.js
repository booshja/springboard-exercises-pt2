import { render } from "@testing-library/react";
import JobDetail from "./JobDetail";

/** Smoke Test */
it("renders without crashing", () => {
    render(<JobDetail />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<JobDetail />);
    expect(asFragment()).toMatchSnapshot();
});
