import logo from "../images/dog.png";
import "../styles/Card.css";

const Card = ({
  name,
  cool,
  largeness,
  handsome,
  aka,
  alignment,
  hide,
  deckSize,
  defaultText,
  message,
  photo,
  photographer,
  link,
}) => {
  if (defaultText) {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="default-message">{message}</div>
        </div>
      </div>
    );
  } else if (deckSize === 0) {
    return <div className="no-cards"></div>;
  } else if (hide) {
    return (
      <div className="hidden-card">
        <div id="card-back-text">
          Animal <br />
          Top Trumps
        </div>
        <img
          id="card-back-logo"
          src={logo}
          alt="Logo"
          height="96px"
          width="96px"
        />
      </div>
    );
  } else {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="name">{name}</div>
          <div className="aka">"{aka}"</div>
          <div className="alignment">({alignment})</div>
          <img
            id="photo"
            src={photo}
            alt={name + " photo"}
            height="150px"
            width="225px"
          />
          <div className="stats">
            <div className="stat-name1">
              Cool <div className="stat1">{cool}</div>
            </div>
            <div className="stat-name2">
              Largeness <div className="stat2">{largeness}</div>
            </div>
            <div className="stat-name1">
              Handsome <div className="stat1">{handsome}</div>
            </div>
          </div>
          <div className="footer">
            Photo by{" "}
            <a
              className="photographer-link"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              {photographer}
            </a>{" "}
            on{" "}
            <a
              className="photographer-link"
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
