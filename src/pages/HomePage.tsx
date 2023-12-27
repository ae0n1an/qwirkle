import React from 'react';
import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route} from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';

const LOCAL_PLAYERS = [{id: "", name: "player1", avatar: ""}, {id: "", name: "player2", avatar: ""}, {id: "", name: "player3", avatar: ""}, {id: "", name: "player4", avatar: ""}]

function Home({nickname, setNickname, avatar, setAvatar}:{nickname: string, setNickname:any, avatar:string, setAvatar:any}) {
  const { createLobby, leaveLobby, lobbyId } = usePlayers();
  const socket = useSocket();

  // when the socket is updated try to leave the lobby
  useEffect(() => {
    if (socket !== undefined && lobbyId !== "") {
      leaveLobby()
    }
  }, [socket]); // run when the page mounts and when pathname is changed

  const nicknameUpdated = () => {
    setNickname((document.getElementById('nickname') as HTMLInputElement).value)
  };

  const avatarUpdated = () => {
    setAvatar((document.getElementById('avatar') as HTMLInputElement).value)
  };

  function handleHostLobby() {
    createLobby(nickname, avatar)
  };

  return (
    <div className="Home">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="nickname" onChange={nicknameUpdated} value={nickname}></input>
          </div>
          <br></br>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input" id="avatar" onChange={avatarUpdated} value={avatar}>
                  <option className="" value="">Select Avatar</option>
                  <option className="g" value="Green">Green</option>
                  <option className="r" value="Red">Red</option>
                  <option className="b" value="Blue">Blue</option>
              </select>
          </div>
          <br></br>
          <Link to="/lobby" style={{pointerEvents: (avatar !== "" && nickname !== "") ? 'all' : 'none'}} onClick={handleHostLobby}>Host Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/join" style={{pointerEvents: (avatar !== "" && nickname !== "") ? 'all' : 'none'}}>Join a Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/game" state={{game: new Game(LOCAL_PLAYERS).serialize(), isLocal:true}}>Play Game Locally with 4 players</Link>
    </div>
  );
}

export default Home;