import './App.css';
import DisplayBoard from './DisplayBoard';
import TokenHolder from "./TokenHolder";
import {useEffect, useState} from 'react';
import { Game } from "./classes/game";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import RefreshIcon from '@mui/icons-material/Refresh';
import TokenCountDisplay from './TokenCountDisplay';
import PlayersDisplay from './PlayersDisplay';
import { Routes, Route } from 'react-router-dom';

type DisplayGameProps = {
  game: Game;
  isLocal: boolean;
  playerId: string;
}

function DisplayGame(props: DisplayGameProps) {
  const { game, isLocal, playerId } = props;
  const [board, setBoard] = useState({board: game.getBoard()});
  const [player, setPlayer] = useState(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)});
  const [status, setStatus] = useState({status: game.getStatus()});

  const undoClicked = () => {
    game.undoMove()
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
  };

  const undoAllClicked = () => {
    game.undoAllMoves()
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
  };

  const shuffleHand = () => {
    game.reshuffleHand()
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
    setStatus({status: game.getStatus()})
  };

  const confirmMove = () => {
    game.confirmTurn()
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
    setStatus({status: game.getStatus()})
  };

  return (
      <div className="center mdl-grid">
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-cell--6-col-phone board">
          <DisplayBoard board={board.board} setBoard={setBoard} setPlayer={setPlayer} game={game}></DisplayBoard>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-cell--6-col-phone">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <h2>{status.status}</h2>
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <TokenHolder player={player.player} setBoard={setBoard} setPlayer={setPlayer} game={game}></TokenHolder>
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--blue game_button" disabled={!isLocal && !game.isMyTurn(playerId)} onClick={() => undoClicked()}>
                    <UndoIcon/>
                    <br></br>
                    <span>
                      Undo
                    </span>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--purple game_button" disabled={!isLocal && !game.isMyTurn(playerId)} onClick={() => shuffleHand()}>
                    <RefreshIcon/>
                    <br></br>
                    <span>
                      New Tokens
                    </span>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--red game_button" disabled={!isLocal && !game.isMyTurn(playerId)} onClick={() => undoAllClicked()}>
                    <ArrowDownwardIcon/>
                    <br></br>
                    <span>
                      Undo All
                    </span>
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--1-col-phone">
                  <button className="mdl-button mdl-button--raised mdl-button--colored mdl-color--green game_button" disabled={!isLocal && !game.isMyTurn(playerId)} onClick={() => confirmMove()}>
                    <DoneIcon/>
                    <br></br>
                    <span>
                      Done
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
                  <PlayersDisplay players = {game.getPlayers()}/>
                </div>
                <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
                  <TokenCountDisplay tokenCount = {game.getRemainingTokenCount()}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DisplayGame;