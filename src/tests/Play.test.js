import Play from "../components/Play";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Play component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Play />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
