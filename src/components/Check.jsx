import React from "react";

export default function Check(props) {

  const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

  const check = "✅";
  const uncheck = "☐";

  const paymentSituation =
    //props.friend.map(friend=>{
    [
      { name: "sayaka", paid: "true" },
      { name: "kaisei", paid: "false" },
      { name: "misho", paid: "true" },
    ].map((friend) => {
      //return props.friend.paid?

      return friend.paid ? (
        <div>
          {check}
          {friend.name}
        </div>
      ) : (
        <div>
          {uncheck}
          {friend.name}
        </div>
      );
    });

  return <>{paymentSituation}</>;
}
