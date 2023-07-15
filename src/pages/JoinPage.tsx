import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

function JoinPage() {
  const location = useLocation()
  const { name, avatar } = location.state
  const [room, setRoom] = useState("");

  const infoUpdated = () => {
    setRoom((document.getElementById('gameCode') as HTMLInputElement).value)
  };

  return (
    <div className="Home">
        <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" placeholder= "Enter Game Code..." id="gameCode" onChange={infoUpdated}></input>
        </div>
        <br></br>
        <Link to="/lobby" style={{pointerEvents: room !== "" ? 'all' : 'none'}} state={{name: name, avatar: avatar, is_host: false, room: room}}>Join Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default JoinPage;