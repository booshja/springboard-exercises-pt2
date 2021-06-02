import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render without crashing", () => {
    render(<App />);
});

it("should match snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
});
