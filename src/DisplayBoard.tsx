import './App.css';
import {useEffect, useState} from 'react';
import DisplayPosition from "./DisplayPosition";
import { Position } from "./classes/position";

type PositionProps = {
  board: Position[][][];
}

function DisplayBoard(props: PositionProps) {
  const { board } = props;
  const [highlighted, setHighlighted] = useState([-1]);
  let board_height = board[0].length

  let board_width = 0
  if (board_height !== 0) { 
    board_width = board[0][0].length
  }

  const renderedOutput = []

  for (let i = 0; i < board_height; i++) { // add the visible board locations
    for (let j = 0; j < board_width; j++) { // add board in the middle
      const handleClick = () => {
        board[0][i][j].notify()
        setHighlighted(board[0][i][j].getHighlighted()? [i, j] : [-1]);
      };
      renderedOutput.push(<DisplayPosition position={board[0][i][j]} highlighted={board[0][i][j].getHighlighted()} onClick={handleClick}></DisplayPosition>)
    }
  }

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(board_width),
    gridTemplateRows: '1fr '.repeat(board_height),
    transition: '300ms',
    padding: '2%'
  };

  return (
    <>
      <div style={wrapper}>
        {renderedOutput}
      </div>
    </>
  );
}

export default DisplayBoard