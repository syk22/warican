import React, { useState, useEffect } from "react";
import './App.css';
import GroupList from "./components/GroupList.jsx";
import Payment from './components/Payment.jsx';
import Check from "./components/Check.jsx";

function App() {
  const nameList = ["sayaka","misho","kaisei"];
  // const [ list , setList ] = useState([]);
  const [currentView, setCurrentView] = useState("GroupList");

  // useEffect(() =>{
  //   console.log("useEffect!")
  //   setList(prevArr =>[...prevArr, nameList])
  //   console.log(list);
  // },[]);

  return (
    <div className="App">
      {currentView === "GroupList" ? (
        <GroupList list={nameList} setView={setCurrentView} />
      ) : (
        <>
          <Payment setView={setCurrentView}/>
          <Check list={nameList} />
        </>
      )}
    </div>
  );
}

export default App;
