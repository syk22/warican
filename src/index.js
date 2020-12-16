import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Home() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/success.html">
          <Success />
        </Route>
        <Route path="/canceled.html">
          <Canceled />
        </Route> */}
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Home />, document.getElementById("root"));
