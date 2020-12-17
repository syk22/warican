import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Success from "./components/Success.jsx";
import Canceled from "./components/Canceled.jsx";

function Home() {
  return (
    <main>
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Canceled} />
        <Route path="/" component={App}/>
      </Switch>
      </main>
  );
}


ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("root")
);
