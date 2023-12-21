import '../App.css';
import { Game } from "../classes/game";
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import * as io from "socket.io-client";
import ChatBox from '../ChatBox';

function LobbyPage() {
  const [players, setPlayers] = useState<{nickname: string, avatar: string}[]>([]);


  /* ADD LOGIC FOR INVALID USER INFO
  if (localStorage.getItem("userName") === null || localStorage.getItem("avatar") === null) {
    navigate('/');
  }
  */

  /*
  <div className="mdl-textfield mdl-js-textfield">
    <input className="mdl-textfield__input" type="text" placeholder= "Enter Message..." onChange={(event)=>{setMessage(event.target.value)}}></input>
  </div>
  */

  return (
    <div className="HostGame">
        <h2>Lobby Code: <strong>{}</strong></h2>
        <PlayersLobbyDisplay players={players}/>
        <ChatBox></ChatBox>
        <br></br>
        <Link to="/game" style={{pointerEvents: players.length > 1 ? 'all' : 'none'}} state={{ numberOfPlayers: players.length}}>Start Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;