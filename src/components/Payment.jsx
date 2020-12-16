import React from 'react';

//const individualPayment = (合計金額どこからくるのですか？/numberOfPeople) 

export default function Payment(props){
    return (
        <>
        <button type="button" className="back" onClick={()=>{
            props.setView("GroupList");
        }}>Back</button>
        <div>{`一人あたま${1+2}です`}</div>
        <button type="button" className="payment" onClick={() =>{
          console.log("hi")  
        }}>Payment</button>
        <div>{`お会計は${10000}円になります`}</div>
        <div>{`Group member: ${6}`}</div>
        </>
    );

}