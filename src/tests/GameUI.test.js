import GameUI from "../components/GameUI";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("GameUI component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <GameUI />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  test("renders message when game is over", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI gameWinner={"Test"} />
      </BrowserRouter>
    );
    expect(getByText("Test wins the game!")).toBeTruthy();
    expect(getByText("GAME OVER")).toBeTruthy();
  });

  test("renders message on tie", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI win={"Tie"} />
      </BrowserRouter>
    );
    expect(getByText("Tie!")).toBeTruthy();
    expect(
      getByText("Top player and computer cards added to tie deck.")
    ).toBeTruthy();
  });

  test("renders 'Player's turn' if playerTurn is true", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI playerTurn={true} />
      </BrowserRouter>
    );
    expect(getByText("Player's turn")).toBeTruthy();
  });

  test("renders 'Computer's turn' if playerTurn is false", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI playerTurn={false} />
      </BrowserRouter>
    );
    expect(getByText("Computer's turn")).toBeTruthy();
  });

  test("renders the names of the round winner and won card", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI win={"Test"} lostCard={"Test card"} />
      </BrowserRouter>
    );
    expect(getByText("Test wins!")).toBeTruthy();
    expect(getByText("Test card added to test's deck.")).toBeTruthy();
  });

  test("renders the names of all won cards after a tie break", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI
          win={"Test"}
          lostCard={"Test card"}
          tieCardsLength={2}
          tieCards={[{ name: "Dog" }, { name: "Cat" }]}
        />
      </BrowserRouter>
    );
    expect(getByText("Test wins!")).toBeTruthy();
    expect(
      getByText("Test card, Dog, and Cat added to test's deck.")
    ).toBeTruthy();
  });

  test("renders a play again and back button if game is over", () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <GameUI gameWinner={"Test"} />
      </BrowserRouter>
    );

    expect(getAllByRole("button")).toHaveLength(2);
  });

  test("renders a clear message button after round win", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI win={"Test"} />
      </BrowserRouter>
    );
    expect(getByText("OK")).toBeTruthy();
  });

  test("renders a list of fields to select on player's turn", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI playerTurn={true} win={false} gameWinner={false} />
      </BrowserRouter>
    );
    expect(getByText("Player's turn")).toBeTruthy();
    expect(getByText("Cool")).toBeTruthy();
    expect(getByText("Largeness")).toBeTruthy();
    expect(getByText("Handsome")).toBeTruthy();
  });

  test("renders a message showing computer's selected field on computer turn", () => {
    const { getByText } = render(
      <BrowserRouter>
        <GameUI
          playerTurn={false}
          win={false}
          gameWinner={false}
          cardHighField={"cool"}
        />
      </BrowserRouter>
    );
    expect(getByText("Computer plays cool...")).toBeTruthy();
  });
});
