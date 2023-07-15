import '../App.css';
import { Game } from "../classes/game";
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import PlayersLobbyDisplay from '../PlayersLobbyDisplay';
import * as io from "socket.io-client";

function LobbyPage() {
  const socket = io.connect("http://localhost:3001")
  const location = useLocation()
  const { name, avatar, is_host, room } = location.state
  const [message, setMessage] = useState('');
  const [chatWindow, setChat] = useState<JSX.Element[]>([]);
  const [number_of_players, setNumberOfPlayers] = useState(3);

  const numberOfPlayerUpdated = () => {
    if (document.getElementById('number_of_players') !== null) {
      setNumberOfPlayers(parseInt((document.getElementById('number_of_players') as HTMLInputElement).value))
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data)
      setChat([...chatWindow, <p>{data}</p>])
    })
  }, [socket])

  socket.emit("join_room", {room})

  const sendMessage = () => {
    socket.emit("send_message", {message, room})
  };

  return (
    <div className="HostGame">
        <PlayersLobbyDisplay players={[]}/>
        <br></br>
        {chatWindow}
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" placeholder= "Enter Message..." onChange={(event)=>{setMessage(event.target.value)}}></input>
        </div>
        <button onClick={() => sendMessage()} className="mdl-button mdl-js-button mdl-button--raised">
          send
        </button>
        <br></br>
        <Link to="/game" style={{pointerEvents: number_of_players > 1 ? 'all' : 'none'}} state={{ numberOfPlayers: number_of_players}}>Start Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default LobbyPage;