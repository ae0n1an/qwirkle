import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import './App.css';
import Position from "./Position";

const MAX_BOARD_SIZE = 108;

function Board() {
  const [size, setSize] = useState(6);
  const arr = []
  
  for (let i = 0; i<(MAX_BOARD_SIZE*(size*2)); i++) {
    arr.push("hello")
  }

  const renderedOutput = arr.map(row => <Position colour={'red'} shape={'square'}></Position>)
  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '0fr '.repeat(MAX_BOARD_SIZE/2 - size) + '1fr '.repeat(size*2) + '0fr '.repeat(MAX_BOARD_SIZE/2 - size),
    transition: '300ms'
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