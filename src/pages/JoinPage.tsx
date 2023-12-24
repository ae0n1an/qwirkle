import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';

function JoinPage({nickname, avatar}:{nickname: string, avatar:string}) {
  const { joinLobby, leaveLobby, lobbyId } = usePlayers()
  const [room, setRoom] = useState("");
  const socket = useSocket()

  // when the socket is updated try to leave the lobby
  useEffect(() => {
    if (socket !== undefined && lobbyId !== "") {
      leaveLobby()
    }
  }, [socket]); // run when the page mounts and when pathname is changed


  const infoUpdated = () => {
    setRoom((document.getElementById('gameCode') as HTMLInputElement).value)
  };

  function handleClick() {
    joinLobby(room, nickname, avatar)
  };

  return (
    <div className="Home">
        <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" placeholder= "Enter Game Code..." id="gameCode" onChange={infoUpdated}></input>
        </div>
        <br></br>
        <Link to="/lobby" style={{pointerEvents: room !== "" ? 'all' : 'none'}} onClick={handleClick}>Join Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default JoinPage;