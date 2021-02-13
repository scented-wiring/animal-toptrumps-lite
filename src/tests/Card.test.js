import Card from "../components/Card";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Card component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Card />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  test("renders a no-cards div if deck size is equal to 0", () => {
    const { container } = render(
      <BrowserRouter>
        <Card deckSize={0} />
      </BrowserRouter>
    );
    expect(container.firstChild).toHaveClass("no-cards");
  });

  test("renders a hidden-card div if hide is true", () => {
    const { container } = render(
      <BrowserRouter>
        <Card hide={true} />
      </BrowserRouter>
    );
    expect(container.firstChild).toHaveClass("hidden-card");
    expect(container.firstChild.textContent).toContain("Animal Top Trumps");
  });
});
