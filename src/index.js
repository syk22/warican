import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
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
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
