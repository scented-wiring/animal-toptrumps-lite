import "../styles/GameUI.css";
import { Link } from "react-router-dom";

const GameUI = ({
  playerTurn,
  playField,
  win,
  lostCard,
  clearWin,
  cardHighField,
  gameWinner,
  tieCards,
  tieCardsLength,
  noCards,
}) => {
  let status, message;

  if (noCards) {
    //if no cards in deck
    status = "No cards found";
    message = 'Go to "Create Cards" from the menu to add cards to your deck.';
  } else if (gameWinner) {
    //if game is over
    status = `${gameWinner} wins the game!`;
    message = "GAME OVER";
  } else if (win === "Tie") {
    //if action results in tie
    status = `${win}!`;
    message = `Top player and computer cards added to tie deck.`;
  } else if (win) {
    //if action results in win
    status = `${win} wins!`;
    message = `${lostCard}${
      //^^lists name of won top card^^
      tieCardsLength > 0 //lists names of won tie cards (if any)
        ? `,${tieCards.map((card) => {
            if (tieCards.length - 1 === tieCards.indexOf(card)) {
              return ` and ${card.name}`;
            } else {
              return ` ${card.name}`;
            }
          })} `
        : " "
    }
    added to ${win.toLowerCase()}'s deck.`;
  } else {
    if (playerTurn) {
      //if player turn
      status = "Player's turn";
      message = "Select a field to play against your opponent:";
    } else {
      //if computer turn
      status = "Computer's turn";
      message = `Computer plays ${cardHighField}...`;
    }
  }

  return (
    <div className="game-ui">
      <div className="status">{status}</div>
      {!win && !gameWinner && tieCardsLength > 0 && (
        <div className="tie">{tieCardsLength} tie cards up for grabs!</div>
      )}
      <div className="message">{message}</div>
      {gameWinner && (
        <div className="buttons">
          <button onClick={() => window.location.reload()}>Play again</button>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      )}
      {win && (
        <button className="clearAlert" onClick={clearWin}>
          OK
        </button>
      )}
      {playerTurn && !noCards && !win && !gameWinner && (
        <div id="fields">
          <div className="field" onClick={() => playField("cool")}>
            Cool
          </div>
          <div className="field" onClick={() => playField("largeness")}>
            Largeness
          </div>
          <div className="field" onClick={() => playField("handsome")}>
            Handsome
          </div>
        </div>
      )}
      {!playerTurn && !win && !gameWinner && (
        <button className="clearAlert" onClick={() => playField(cardHighField)}>
          OK
        </button>
      )}
    </div>
  );
};

export default GameUI;
