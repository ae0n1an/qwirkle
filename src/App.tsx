import './App.css';
import DisplayBoard from './DisplayBoard';
import TokenHolder from "./TokenHolder";
import {useEffect, useState} from 'react';
import { Game } from "./classes/game";

type AppProps = {
  game: Game;
}

function App(props: AppProps) {
  const { game } = props;
  const [board, setBoard] = useState({board: game.getBoard()});
  const [player, setPlayer] = useState({player: game.getActivePlayer()});

  return (
    <div className="App">
      <div className="center mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <DisplayBoard board={board.board} setBoard={setBoard} setPlayer={setPlayer} game={game}></DisplayBoard>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <TokenHolder player={player.player} setBoard={setBoard} setPlayer={setPlayer} game={game}></TokenHolder>
        </div>
      </div>
    </div>
  );
}

export default App;
