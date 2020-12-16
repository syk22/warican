import React, { useState } from "react";
import './App.css';
import GroupList from "./components/GroupList.jsx";
import Payment from './components/Payment.jsx';
import Check from "./components/Check.jsx";

function App() {
  const nameList = [
    {name:"sayaka", selected: false, paid:"false"}, 
    {name:"kaisei", selected: false, paid:"false"}, 
    {name:"misho", selected: false, paid:"false"}
    ];
  const [ list , setList ] = useState(nameList);
  const [currentView, setCurrentView] = useState("GroupList");

  // useEffect(() =>{
  //   console.log("useEffect!")
  //   setList(prevArr =>[...prevArr, nameList])
  //   console.log(list);
  // },[]);

  return (
    <div className="App">
      {currentView === "GroupList" ? (
        <GroupList list={list} setList={setList} setView={setCurrentView} />
      ) : (
        <>
          <Payment setView={setCurrentView}/>
          <Check list={list} />
        </>
      )}
    </div>
  );
}

export default App;
