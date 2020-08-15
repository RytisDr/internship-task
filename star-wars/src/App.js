import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/style.scss";
import Films from "./components/Films";

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
      <Films></Films>
    </div>
  );
}

export default App;
