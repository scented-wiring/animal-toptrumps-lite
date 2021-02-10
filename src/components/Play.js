import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cards } from "../cards/index";
import Card from "../components/Card";
import GameUI from "../components/GameUI";
import "../styles/Play.css";

const Play = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [xPosition, setXPosition] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [playerCards, setPlayerCards] = useState([]);
  const [playerCard, setPlayerCard] = useState({});
  const [computerCards, setComputerCards] = useState([]);
  const [computerCard, setComputerCard] = useState({});
  const [lostCard, setLostCard] = useState("");
  const [cardHighField, setCardHighField] = useState("");
  const [showWonCard, setShowWonCard] = useState("");

  const [playerTurn, setPlayerTurn] = useState(true);

  const [tieCards, setTieCards] = useState([]);
  const [win, setWin] = useState("");
  const [gameWinner, setGameWinner] = useState("");
  const [noCards, setNoCards] = useState(false);

  const handleWinnerCards = (
    loserCard,
    winnerCards,
    setWinnerCards,
    playerWin
  ) => {
    playerWin ? setShowWonCard("Player") : setShowWonCard("Computer");
    setLostCard(loserCard.name);
    winnerCards.push(winnerCards.splice(0, 1)[0]);
    winnerCards.push(loserCard);
    setWinnerCards(winnerCards);

    tieCards.length > 0 && setWinnerCards(winnerCards.concat(tieCards));
    if (playerWin) {
      setPlayerTurn(true);
      setWin("Player");
    } else {
      setPlayerTurn(false);
      setWin("Computer");
    }
  };

  const handleLoserCards = (loserCards, setLoserCards, setLoserCard) => {
    loserCards.splice(0, 1);
    setLoserCards(loserCards);
    setLoserCard(loserCards[0]);
  };

  const findHighValue = () => {
    //below is required to remove "id" key
    let cardValues = Object.assign(
      {},
      {
        cool: computerCard.cool,
        handsome: computerCard.handsome,
        largeness: computerCard.largeness,
      }
    );
    let highValue = Math.max(...Object.values(cardValues));
    setCardHighField(
      Object.keys(computerCard).find((key) => computerCard[key] === highValue)
    );
  };

  const handlePlayField = (field) => {
    if (playerCard[field] === computerCard[field]) {
      //tie
      setTieCards((tieCards) => [...tieCards, playerCard, computerCard]);
      handleLoserCards(computerCards, setComputerCards, setComputerCard);
      handleLoserCards(playerCards, setPlayerCards, setPlayerCard);
      setWin("Tie");
    } else if (playerCard[field] > computerCard[field]) {
      //player win
      handleWinnerCards(computerCard, playerCards, setPlayerCards, true);
      handleLoserCards(computerCards, setComputerCards, setComputerCard);
    } else {
      //computer win
      handleWinnerCards(playerCard, computerCards, setComputerCards, false);
      handleLoserCards(playerCards, setPlayerCards, setPlayerCard);
    }
  };

  const handleClearWin = () => {
    if (win === "Player") {
      setPlayerCard(playerCards[0]);
    } else if (win === "Computer") {
      setComputerCard(computerCards[0]);
    }
    setWin(false);
    setShowWonCard("");
    if (win !== "Tie") {
      setTieCards([]);
    }
    if (playerCards.length === 0) {
      setGameWinner("Computer");
    } else if (computerCards.length === 0) {
      setGameWinner("Player");
    } else {
      findHighValue();
    }
  };

  useEffect(() => {
    const deal = (array) => {
      let i;
      for (i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) % 2 === 0) {
          playerCards.push(array[i]);
        } else {
          computerCards.push(array[i]);
        }
      }
    };

    const shuffle = (array) => {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    deal(shuffle(cards));
    setPlayerCard(playerCards[0]);
    setComputerCard(computerCards[0]);
    !playerCards.length && !computerCards.length && setNoCards(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (width >= 1106) {
      setXPosition(600);
      setSpeed(0.7);
    } else if (width >= 760) {
      setXPosition(475);
      setSpeed(0.5);
    } else if (width >= 474) {
      setXPosition(181);
      setSpeed(0.4);
    } else if (width >= 386) {
      setXPosition(151);
      setSpeed(0.4);
    } else {
      setXPosition(116);
      setSpeed(0.3);
    }
  }, [showWonCard, width]);

  const renderPlayerDeck = () => {
    return (
      <div className="player">
        <div className={playerTurn ? "score-active" : "score"}>
          Player: {playerCards.length}{" "}
          {playerCards.length === 1 ? `card` : `cards`}
        </div>
        {showWonCard === "Player" && tieCards.length > 0 && (
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="card-animation">
              <Card {...tieCards[0]} />
            </div>
          </motion.div>
        )}
        {showWonCard === "Player" && (
          <motion.div
            initial={{ x: xPosition }}
            animate={{ x: 0 }}
            transition={{ duration: speed }}
          >
            <div className="card-animation">
              <Card {...playerCards.find((card) => card.name === lostCard)} />
            </div>
          </motion.div>
        )}
        {win === "Tie" && (
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: -70,
              opacity: 0,
              transitionEnd: { display: "none" },
            }}
            transition={{ duration: 1 }}
          >
            <div className="card-animation">
              <Card {...tieCards[0]} />
            </div>
          </motion.div>
        )}
        <div className="current-card">
          <Card {...playerCard} win={win} deckSize={playerCards.length} />
        </div>
      </div>
    );
  };

  const renderComputerDeck = () => {
    return (
      <div className="computer">
        <div className={!playerTurn ? "score-active" : "score"}>
          Computer: {computerCards.length}{" "}
          {computerCards.length === 1 ? `card` : `cards`}
        </div>
        {showWonCard === "Computer" && tieCards.length > 0 && (
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="card-animation">
              <Card {...tieCards[0]} />
            </div>
          </motion.div>
        )}
        {showWonCard === "Computer" && (
          <motion.div
            initial={{ x: -Math.abs(xPosition) }}
            animate={{ x: 0 }}
            transition={{ duration: speed }}
          >
            <div className="card-animation">
              <Card {...computerCards.find((card) => card.name === lostCard)} />
            </div>
          </motion.div>
        )}
        {win === "Tie" && (
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: -70,
              opacity: 0,
              transitionEnd: { display: "none" },
            }}
            transition={{ duration: 1 }}
          >
            <div className="card-animation">
              <Card {...tieCards[1]} />
            </div>
          </motion.div>
        )}
        <div className="current-card">
          <Card
            {...computerCard}
            win={win}
            deckSize={computerCards.length}
            hide={true}
          />
        </div>
      </div>
    );
  };

  const renderGameUI = () => {
    return (
      <GameUI
        playerTurn={playerTurn}
        playField={handlePlayField}
        win={win}
        lostCard={lostCard}
        clearWin={handleClearWin}
        cardHighField={cardHighField}
        gameWinner={gameWinner}
        tieCards={tieCards}
        tieCardsLength={tieCards.length}
        noCards={noCards}
      />
    );
  };

  const arrangeDisplay = () => {
    if (width > 690) {
      return (
        <div className="game">
          {renderPlayerDeck()}
          {renderGameUI()}
          {renderComputerDeck()}
        </div>
      );
    } else {
      return (
        <div className="game">
          <div className="mobile-cards">
            {renderPlayerDeck()}
            {renderComputerDeck()}
          </div>
          {renderGameUI()}
        </div>
      );
    }
  };

  return (
    <div className="Play">
      {arrangeDisplay()}
      <Link to="/">
        <div className="back">&larr; BACK</div>
      </Link>
    </div>
  );
};

export default Play;
