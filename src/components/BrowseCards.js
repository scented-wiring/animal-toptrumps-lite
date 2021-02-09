import { useState } from "react";
import { Link } from "react-router-dom";
import { cards } from "../cards/index";
import "../styles/BrowseCards.css";
import Card from "./Card";

const BrowseCards = () => {
  const initialState = {
    alert: {
      message: "",
      alertType: "",
    },
    card: {
      message: "Choose a card to view its stats.",
      defaultText: true,
    },
  };

  const [card, setCard] = useState(initialState.card);

  return (
    <div id="BrowseCards">
      <h2>Browse Cards</h2>
      <div id="display">
        <select
          name="selectCards-drop"
          id="selectCards-drop"
          onChange={(e) =>
            setCard(
              cards[document.getElementById("selectCards-drop").selectedIndex]
            )
          }
        >
          {cards.map((card) => (
            <option key={cards.indexOf(card)}>{card.name}</option>
          ))}
        </select>
        <select
          name="selectCards"
          id="selectCards"
          size="15"
          onChange={(e) =>
            setCard(cards[document.getElementById("selectCards").selectedIndex])
          }
        >
          {cards.map((card) => (
            <option key={cards.indexOf(card)}>{card.name}</option>
          ))}
        </select>
        <Card {...card} />
      </div>
      <Link to="/">
        <div className="back">&larr; BACK</div>
      </Link>
    </div>
  );
};

export default BrowseCards;
