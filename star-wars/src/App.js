import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/style.scss";
import Characters from "./components/Characters";
import CharacterPage from "./pages/Character";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/character/:id`} component={CharacterPage} />
          <Characters />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
