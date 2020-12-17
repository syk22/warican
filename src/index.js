import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Success from "./components/Success.jsx";
import Canceled from "./components/Canceled.jsx";

function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/canceled" component={Canceled} />
        <Route path="/" />
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("root")
);
