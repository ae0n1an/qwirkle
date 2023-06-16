import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import './App.css';
import Position from "./Position";

const MAX_BOARD_SIZE = 108;

type PositionProps = {
  board: { colour: string; shape: string; }[][];
}

function Board(props: PositionProps) {
  const { board } = props;
  const visible_board_size = board.length

  const renderedOutput = []

  for (let i = 0; i < visible_board_size; i++) { // add the visible board locations
    for (let j = 0; j < visible_board_size; j++) { // add board in the middle
      renderedOutput.push(<Position colour={board[i][j].colour} shape={board[i][j].shape}></Position>)
    }
  }

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(visible_board_size),
    gridTemplateRows: '1fr '.repeat(visible_board_size),
    transition: '300ms'
  };

  return (
    <>
      <div style={wrapper}>
        {renderedOutput}
      </div>
    </>
  );
}

export default Board