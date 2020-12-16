import React from 'react';

//const individualPayment = (合計金額どこからくるのですか？/numberOfPeople) 

export default function Payment(props){
    let total= props.receipts[1].balance;
    return (
        <>
        <button type="button" className="back" onClick={()=>{
            props.setView("GroupList");
        }}>Back</button>
        <input type="text" className="receipt" placeholder="input receipt id" ></input>
        <div>{`一人あたま${Math.floor(total / props.member)}です`}</div>
        <button type="button" className="payment" onClick={() =>{
          console.log("hi")  
        }}>Payment</button>
        <div>{`お会計は${total}円になります`}</div>
        <div>{`Group member: ${props.member}`}</div>
        </>
    );

}