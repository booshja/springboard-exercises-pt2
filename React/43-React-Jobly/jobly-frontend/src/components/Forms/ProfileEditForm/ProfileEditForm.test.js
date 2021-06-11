import { render } from "@testing-library/react";
import ProfileEditForm from "./ProfileEditForm";

/** Smoke Test */
it("renders without crashing", () => {
    render(<ProfileEditForm />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<ProfileEditForm />);
    expect(asFragment()).toMatchSnapshot();
});
