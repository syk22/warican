import React, { useState, useEffect } from "react";
import './App.css';
import GroupList from "./components/GroupList.jsx";
import Payment from "./components/Payment.jsx";
import Check from "./components/Check.jsx";
import axios from "axios";

// Eliot - I suppose this will be the
function App() {
  const nameList = [
    {name:"sayaka", selected: false}, 
    {name:"kaisei", selected: false}, 
    {name:"misho", selected: false}
    ];
  const [ list , setList ] = useState(nameList);
  const [ member, setMember ] = useState(0);
  const [ receipts, setReceipts ] = useState([]);
  const [currentView, setCurrentView] = useState("GroupList");

  useEffect(() => {
    console.log("useEffect!")
    async function name(){
      let names = await axios ({
        method: "get",
        url: "/api/members"
      });
      let receipts = await axios ({
        method: "get",
        url: "/api/receipts"
      })
      console.log(names);
      console.log(receipts);
      setList(names.data);
      setReceipts(receipts.data);
    }
    name();
  },[]);    

  console.log(receipts);
  return (
    <div className="App">
      <div className="topbar">
      {/* <a href="/"><img src="/static/images/warican_flower.png" alt="warican-flowerer" className="logo"/></a> */}
      {currentView === "GroupList" ? (
        <div>Group Setting</div>
      ) : (
        <div>Payment</div>
      )}
      </div>
      {currentView === "GroupList" ? (
        <GroupList 
        list={list} 
        setList={setList}
        setView={setCurrentView}
        member={member}
        setMember={setMember} />
      ) : (
        <>
          <Payment
          setView={setCurrentView}
          member={member} 
          receipts={receipts} />
          <Check list={list} />
        </>
      )}
    </div>
  );
}

export default App;
