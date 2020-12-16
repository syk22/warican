import React from 'react';

export default function GroupList(props){

    return (
        <>
         <h1>Group Setting</h1>
         <div>
         {props.list.map(friend=>(
         <div>
             {friend}
             <button type="button" className="add" onClick={()=>{
                 console.log("add button")
             }}>add</button>
         </div>))}
        </div>
        <button type="button" className="confirm" onClick={()=>{
            props.setView("Payment");
        }}>confirm</button>
        </>
    );
};

