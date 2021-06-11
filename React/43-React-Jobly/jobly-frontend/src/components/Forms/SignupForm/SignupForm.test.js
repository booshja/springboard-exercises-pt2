import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

/** Smoke Test */
it("renders without crashing", () => {
    render(<SignupForm />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
});
