import App from "../components/App";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
