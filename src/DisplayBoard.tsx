import './App.css';
import DisplayPosition from "./DisplayPosition";
import { Board } from './classes/board';
import { Player } from './classes/player';
import { Game } from './classes/game';

type PositionProps = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<{board: Board;}>>;
  setPlayer: React.Dispatch<React.SetStateAction<{player: Player;}>>;
  game: Game;
  playerById: boolean;
  playerId: string
}

function DisplayBoard(props: PositionProps) {
  const { board, setBoard, setPlayer, game, playerById, playerId } = props;
  const postion_board = board.getTokenBoard()
  let board_height = postion_board[0].length

  let board_width = 0
  if (board_height !== 0) { 
    board_width = postion_board[0][0].length
  }

  const renderedOutput: JSX.Element[] = []

  postion_board[0].forEach((row) => {
    row.forEach((pos) => {
      const handleClick = () => {
        pos.notify();
      };
      renderedOutput.push(<DisplayPosition position={pos} highlighted={pos === board.getSelectedPosition()} playerById={playerById} playerId={playerId} setBoard={setBoard} setPlayer={setPlayer} game = {game} onClick = {handleClick}></DisplayPosition>)
    });
  });

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr '.repeat(board_width),
    gridTemplateRows: '1fr '.repeat(board_height),
    transition: '300ms'
  };
  
  return (
    <>
      <div className='board-container' style={wrapper}>
        {renderedOutput}
      </div>
    </>
  );
}

export default DisplayBoard