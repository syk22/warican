import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../index.css";

export default function Success(props) {
  const [redirect, setRedirect] = useState(null);

    setTimeout(() => {
      setRedirect(<Redirect to="/" />);
    }, 5000)

   return (
  <div id="success">
      {redirect};
    <h1>THANK YOU!</h1>
    <h1>✔️</h1>
    <p>
      Payment successfully processed redirecting to Home in few seconds...
    </p>
  </div>)
}
