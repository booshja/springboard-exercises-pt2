import { render } from "@testing-library/react";
import CompanyDetail from "./CompanyDetail";

/** Smoke Test */
it("renders without crashing", () => {
    render(<CompanyDetail />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<CompanyDetail />);
    expect(asFragment()).toMatchSnapshot();
});
