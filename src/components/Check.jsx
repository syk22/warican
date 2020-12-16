import React from 'react';

export default function Check(props){
    const presentMembers = 
     props.list.filter(friend=>{ 
    return friend.selected===true}).map(friend=>{
    return <div>{friend.user_name}</div>})    
    
    return (
        <>{presentMembers}</>

    );
}
