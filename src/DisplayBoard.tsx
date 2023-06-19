import './App.css';
import DisplayPosition from "./DisplayPosition";
import { Position } from "./classes/Position";

type PositionProps = {
  board: Position[][];
}

function DisplayBoard(props: PositionProps) {
  const { board } = props;
  const board_height = board.length

  let board_width = 0
  if (board_height !== 0) {
    board_width = board[0].length
  }

  const renderedOutput = []

  for (let i = 0; i < board_height; i++) { // add the visible board locations
    for (let j = 0; j < board_width; j++) { // add board in the middle
      renderedOutput.push(<DisplayPosition token={board[i][j].getToken()}></DisplayPosition>)
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