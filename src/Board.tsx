import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import './App.css';
import Position from "./Position";

function Board() {
  const [size, setSize] = useState(12);
  const arr = []
  for (let i = 0; i<size**2; i++) {
    arr.push("hello")
  }
  const renderedOutput = arr.map(row => <Position></Position>)
  const wrapper = {
    display: 'grid',
    gridTemplateColumns: 'repeat(' + size + ', 1fr)'
  };
  return (
    <>
      <h1>Current size is {size.toString()}!</h1>
      <button
        type="button"
        onClick={() => setSize(size-1)}
      >Reduce</button>
      <button
        type="button"
        onClick={() => setSize(size+1)}
      >increase</button>
      <div style={wrapper}>
        {renderedOutput}
      </div>
    </>
  );
}

export default Board