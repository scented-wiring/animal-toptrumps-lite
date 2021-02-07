import "../styles/App.css";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import logo from "../images/dog.png";

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
      </Switch>
    </div>
  );
};

export default App;
