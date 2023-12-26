import '../App.css';
import { Game } from "../classes/game";
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import * as io from "socket.io-client";
import useLocalStorage from '../hooks/useLocalStorage';
import { usePlayers } from '../contexts/PlayersProvider';

function LobbyPage() {
  //const [players, setPlayers] = useState<{nickname: string, avatar: string}[]>([]);
  const { players, lobbyId } = usePlayers()

  return (
    <div className="HostGame">
        <h2>Lobby Code: <strong>{lobbyId}</strong></h2>
        <PlayersLobbyDisplay players={players}/>
        <br></br>
        <Link to="/game" style={{pointerEvents: players.length > 1 ? 'all' : 'none'}} state={{ players: players, isLocal:false}}>Start Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;
