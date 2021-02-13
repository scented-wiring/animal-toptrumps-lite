import BrowseCards from "../components/BrowseCards";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("BrowseCards component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <BrowseCards />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  test("shows stats of card from select menu when clicked", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <BrowseCards />
      </BrowserRouter>
    );

    fireEvent.change(document.getElementById("selectCards"), {
      target: { value: "Cat" },
    });
    expect(getByText('"Tiddles"')).toBeTruthy();
  });

  test("shows stats of card from mobile dropdown menu when clicked", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <BrowseCards />
      </BrowserRouter>
    );

    fireEvent.change(document.getElementById("selectCards-drop"), {
      target: { value: "Cat" },
    });
    expect(getByText('"Tiddles"')).toBeTruthy();
  });
});
