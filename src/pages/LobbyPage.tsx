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

  return (
    <div className="HostGame">
        <h2>Lobby Code: <strong>{lobbyId}</strong></h2>
        <PlayersLobbyDisplay players={players}/>
        <br></br>
        {isHost ? <><Link to="/game" style={{pointerEvents: players.length > 1 ? 'all' : 'none'}} state={{ players: players, isLocal:false, game: new Game(players).serialize()}}>Start Game</Link> <br></br>or<br></br></> : <></>}
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;
