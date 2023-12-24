import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { usePlayers } from '../contexts/PlayersProvider';

function JoinPage({nickname, avatar}:{nickname: string, avatar:string}) {
  const { joinLobby } = usePlayers()
  const [room, setRoom] = useState("");

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