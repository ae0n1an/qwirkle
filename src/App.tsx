import React, { useState, useRef } from "react";
import './App.css';
import Board from './Board';
import TokenHolder from "./TokenHolder";

const INITIAL_BOARD_SIZE = 15; // the visible width n of the n*n board


function App() {
  const board = []
  
  for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
    let row = []
    for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
      row.push({colour: "none", shape:"empty"})
    }
    board.push(row)
  }

  return (
    <div className="App">
      <div className="center">
        <Board board={board}></Board>
        <TokenHolder></TokenHolder>
      </div>
    </div>
  );
}

export default App;
