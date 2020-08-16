import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/style.scss";
import Characters from "./components/Characters";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Router>
            <Switch>
              <Route path="/character"></Route>
            </Switch>
          </Router>
        </nav>
      </header>
      <Characters></Characters>
    </div>
  );
}

export default App;
