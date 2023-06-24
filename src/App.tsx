import './App.css';
import DisplayBoard from './DisplayBoard';
import TokenHolder from "./TokenHolder";
import {useEffect, useState} from 'react';
import { Game } from "./classes/game";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import RefreshIcon from '@mui/icons-material/Refresh';

type AppProps = {
  game: Game;
}

function App(props: AppProps) {
  const { game } = props;
  const [board, setBoard] = useState({board: game.getBoard()});
  const [player, setPlayer] = useState({player: game.getActivePlayer()});

  const undoClicked = () => {
    game.undoMove()
    setBoard({board: game.getBoard()})
    setPlayer({player: game.getActivePlayer()})
  };

  const undoAllClicked = () => {
    game.undoAllMoves()
    setBoard({board: game.getBoard()})
    setPlayer({player: game.getActivePlayer()})
  };

  return (
    <div className="App">
      <div className="center mdl-grid">
        <div className="mdl-cell mdl-cell--6-col board">
          <DisplayBoard board={board.board} setBoard={setBoard} setPlayer={setPlayer} game={game}></DisplayBoard>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <TokenHolder player={player.player} setBoard={setBoard} setPlayer={setPlayer} game={game}></TokenHolder>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--blue" onClick={() => undoClicked()}>
                    <UndoIcon/>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--purple">
                    <RefreshIcon/>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--red" onClick={() => undoAllClicked()}>
                    <ArrowDownwardIcon/>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--green">
                    <DoneIcon/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
