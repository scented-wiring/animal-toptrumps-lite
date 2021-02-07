import pokerdogs from "../images/pokerdogs.png";
import twitter from "../images/twitter.png";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div id="Home">
      <img
        id="pokerdogs"
        src={pokerdogs}
        alt="dogs playing poker"
        width="500px"
      />
      <div className="buttons">
        <Link to="/play">
          <button type="button">Play</button>
        </Link>
        <Link to="/browsecards">
          <button type="button">Browse Cards</button>
        </Link>
        <Link to="/instructions">
          <button type="button">Instructions</button>
        </Link>
      </div>
      <footer>
        Created by Tom Hammersley 2021{" "}
        <a
          href="https://twitter.com/scentedwiring"
          target="_blank"
          rel="noreferrer"
        >
          <img id="twitter" src={twitter} alt="twitter" height="20px" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
