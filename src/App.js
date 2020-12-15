import React, { useState, useEffect } from "react";
import './App.css';
import GroupList from "./components/GroupList.jsx";

function App() {
  const [ list, setList ] = useState([]);
  const nameList = ["sayaka", "misho", "kaisei"];

  useEffect(() =>{
    console.log("useEffect!")
    setList(prevArr =>[...prevArr, nameList])
    console.log(list);
  },[]);

  return (
    <div className="App">
     <GroupList list={list} />
    </div>
  );
}

export default App;
