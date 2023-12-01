import '../App.css';
import { Game } from "../classes/game";
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import * as io from "socket.io-client";

// storing socket connection in this global variable
let socket:any = null;

function LobbyPage() {
  const location = useLocation()
  const navigate = useNavigate();
  const { room, is_host, nickname, avatar } = location.state
  const [players, setPlayers] = useState<{nickname: string, avatar: string}[]>([{nickname: nickname, avatar: avatar}]);

  // after component mount...
  useEffect(() => {
    // connect to the socket server
    socket = io.connect("http://localhost:3001")

    socket.emit("join_room", {room: room, is_host:is_host, nickname: nickname, avatar: avatar})

    // when connected, look for when the server emits a new player joining
    socket.on("player joined", (player: {socketId: string, nickname: string, avatar: string}) => {
      players.push(player)
      setPlayers(players)
    })

    // when disconnected, look for when the server emits a new player disconnecting
    socket.on("player disconnected", (player: {socketId: string, nickname: string, avatar: string}) => {
      for (let i = 0; i < players.length; i++) {
        //players.slice.
      }
      setPlayers(players)
    })
  }, []);

  if (localStorage.getItem("userName") === null || localStorage.getItem("avatar") === null) {
    localStorage.removeItem("userName")
    localStorage.removeItem("avatar")
    navigate('/');
  }

  /*
  <div className="mdl-textfield mdl-js-textfield">
    <input className="mdl-textfield__input" type="text" placeholder= "Enter Message..." onChange={(event)=>{setMessage(event.target.value)}}></input>
  </div>
  */

  return (
    <div className="HostGame">
        <h2>Lobby Code: <strong>{room}</strong></h2>
        <PlayersLobbyDisplay players={players}/>
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