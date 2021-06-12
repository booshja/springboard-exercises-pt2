import { render } from "@testing-library/react";
import CompanyPage from "./CompanyPage";

/** Smoke Test */
it("renders without crashing", () => {
    render(<CompanyPage />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<CompanyPage />);
    expect(asFragment()).toMatchSnapshot();
});
