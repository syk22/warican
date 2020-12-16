import React from 'react';

export default function Check(props){
    const check = "✅";
    const uncheck =" uncheck ";

    return (
        <>  
        {props.list.map(friend=>(
         <div>
             {check}{friend}
        </div>))}
        </>
    );
}

// const paid = props.paid;
// 
/** 
 * const paid = props.paid;
 * if (paid){
 * return (
 * {props.list.map(friend>{
 * <div>{check){friend}
 * <\div>))}
 * 
 * 
 * return (
 * {props.list.map(friend>{
 * <div>{uncheck){friend}
 * <\div>))}
 * </>
 */  

 