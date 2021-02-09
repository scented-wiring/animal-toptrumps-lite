import { Link, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import logo from "../images/dog.png";
import "../styles/App.css";
import BrowseCards from "./BrowseCards";
import Play from "./Play";

const App = () => {
  return (
    <div id="App">
      <div id="title">
        <Link to="/">
          <img id="logo" src={logo} alt="Logo" width="70px" height="70px" />{" "}
        </Link>
        <Link to="/">
          <h1>Animal Top Trumps</h1>
        </Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Play} />
        <Route exact path="/browsecards" component={BrowseCards} />
      </Switch>
    </div>
  );
};

export default App;
