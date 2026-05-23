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
import { useSocket } from './contexts/SocketProvider';

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
  const socket = useSocket();

  // useEffect or other logic that depends on the 'game' prop
  useEffect(() => {
    // Handle changes in the 'game' prop
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
    setStatus({status: game.getStatus()})
  }, [game, isLocal, playerId]);

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
    if (!isLocal) { // update other poeples games if it is an online game
      socket?.emit('update-game', { playerId: playerId, game: game.serialize()});
    }
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
    setStatus({status: game.getStatus()})
  };

  const confirmMove = () => {
    if (game.confirmTurn() && !isLocal) { // attempt the move if it is successful will update the other players games
      socket?.emit('update-game', { playerId: playerId, game: game.serialize()});
    }
    setBoard({board: game.getBoard()})
    setPlayer(isLocal ? {player: game.getActivePlayer()} : {player: game.getPlayerById(playerId)})
    setStatus({status: game.getStatus()})
  };

  const activeId = game.getActivePlayer()?.getId();
  const myTurn = !isLocal && !game.isMyTurn(playerId);

  return (
    <div className="game-layout">

      {/* Mobile-only top bar */}
      <div className="mobile-game-header">
        {game.getPlayers().map((p, i) => (
          <div key={i} className={`mobile-player-chip${p.getId() === activeId ? ' active' : ''}`}>
            <div className="mobile-player-avatar" style={{ backgroundColor: p.getAvatar() }}>
              {p.getName().charAt(0).toUpperCase()}
            </div>
            <div className="mobile-player-info">
              <span className="mobile-player-name">{p.getName()}</span>
              <span className="mobile-player-score">{p.getScore()}</span>
            </div>
          </div>
        ))}
        <div className="mobile-tokens-badge">
          <span className="mobile-tokens-count">{game.getRemainingTokenCount()}</span>
          <span className="mobile-tokens-label">left</span>
        </div>
      </div>

      <div className="game-play">
        <div className="board-area">
          <DisplayBoard board={board.board} setBoard={setBoard} setPlayer={setPlayer} game={game} playerId={playerId} playerById={!isLocal}/>
        </div>
        <div className="hand-wrapper">
          <TokenHolder player={player.player} setBoard={setBoard} setPlayer={setPlayer} game={game} playerId={playerId} playerById={!isLocal}/>
        </div>
        <div className="game-buttons">
          <button className="game_button btn-blue" disabled={myTurn} onClick={() => undoClicked()}>
            <UndoIcon fontSize="small"/><span>Undo</span>
          </button>
          <button className="game_button btn-purple" disabled={myTurn} onClick={() => shuffleHand()}>
            <RefreshIcon fontSize="small"/><span>New Tokens</span>
          </button>
          <button className="game_button btn-red" disabled={myTurn} onClick={() => undoAllClicked()}>
            <ArrowDownwardIcon fontSize="small"/><span>Undo All</span>
          </button>
          <button className="game_button btn-green" disabled={myTurn} onClick={() => confirmMove()}>
            <DoneIcon fontSize="small"/><span>Done</span>
          </button>
        </div>
      </div>

      <div className="game-sidebar">
        <h2 className="game-status">{status.status}</h2>
        <PlayersDisplay players={game.getPlayers()}/>
        <TokenCountDisplay tokenCount={game.getRemainingTokenCount()}/>
      </div>

    </div>
  );
}

export default DisplayGame;