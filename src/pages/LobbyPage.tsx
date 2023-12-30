import '../App.css';
import { Game } from "../classes/game";
import DisplayGame from '../DisplayGame';
import { Link, Navigate } from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import * as io from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function LobbyPage() {
  const { players, lobbyId, isHost} = usePlayers()
  const socket = useSocket()
  const navigate = useNavigate(); // Use the useNavigate hook here

  useEffect(() => {
    if (socket == null) return

    const gameStarted = ({ game }: { game: any }) => {
      navigate('/game', { state: { isLocal: false, game } });
    };

    socket.on('game-started', gameStarted)

    return () => { socket.off('game-started') }
  }, [socket])


  const handleCopyClick = () => {
    // Create a temporary textarea to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = lobbyId;
    document.body.appendChild(textarea);
    textarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);
  };

  return (
    <div className="HostGame">
        <h3>Lobby Code:</h3>
        <h3>
          <strong>{lobbyId}</strong>
          <button title="Copy" className="mdl-button mdl-js-button mdl-button--icon" onClick={handleCopyClick}>
            <ContentCopyIcon/>
          </button>
        </h3>
        <PlayersLobbyDisplay players={players} isHost={isHost}/>
        <br></br>
        {isHost ? <><Link to="/game" style={{pointerEvents: players.length > 1 ? 'all' : 'none'}} state={{ players: players, isLocal:false, game: new Game(players).serialize()}}>Start Game</Link> <br></br>or<br></br></> : <></>}
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;
