import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../index.css";

export default function Canceled(props) {
  const [redirect, setRedirect] = useState(null);

    setTimeout(() => {
      setRedirect(<Redirect to="/" />);
    }, 3500)

   return (
  <div id="cancel">
      {redirect};
    <h1>Your payment was unsuccessful :(</h1>
    <h1>❌</h1>
    <p>
      Redirecting to Home in a few seconds...
    </p>
  </div>)
}
