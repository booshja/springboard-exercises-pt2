import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render", () => {
    render(<Carousel />);
});

it("should match snapshot", () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it("does not display the left arrow on the first image", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // expect the left arrow not to show on first image, but expect right arrow to show
    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(queryByTestId("right-arrow")).toBeInTheDocument();
});

it("does not display the right arrow on the last image", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward to last image of carousel (default is 3 cards)
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // expect the third image to show, not the first two
    expect(
        queryByAltText("Photo by Josh Post on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // expect the right arrow to not show, but expect left to show
    expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    // move to the second card in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    //expect the second image to show, but not the first
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    //expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
});
