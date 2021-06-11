import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";

/** Smoke Test */
it("renders without crashing", () => {
    render(<SearchBar />);
});

/** Snapshot Test */
it("matches snapshot", () => {
    const { asFragment } = render(<SearchBar />);
    expect(asFragment()).toMatchSnapshot();
});
