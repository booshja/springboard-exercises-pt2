import { render } from "@testing-library/react";
import VendingMachine from "./VendingMachine";

it("renders without crashing", () => {
    render(<VendingMachine />);
});

it("matches snapshot", () => {
    const { asFragment } = render(<VendingMachine />);
    expect(asFragment()).toMatchSnapshot();
});
