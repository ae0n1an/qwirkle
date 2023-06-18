import './App.css';
import Position from "./Position";
import { Token } from "./classes/token";

type PositionProps = {
  board: Token[][];
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
      renderedOutput.push(<Position colour={board[i][j].getColour()} shape={board[i][j].getShape()}></Position>)
    }
  }

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(board_width),
    gridTemplateRows: '1fr '.repeat(board_height),
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

export default DisplayBoard