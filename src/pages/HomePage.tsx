import '../App.css';
import { Game } from "../classes/game";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useGame } from '../contexts/GameProvider';

const LOCAL_PLAYERS = [{id: "", name: "Green", avatar: "#22B14C"}, {id: "", name: "Red", avatar: "#ED1C24"}, {id: "", name: "Blue", avatar: "#00A2E8"}, {id: "", name: "Orange", avatar: "#FF7F27"}]
// {id: "", name: "Purple", avatar: "#A349A4"}, {id: "", name: "Yellow", avatar: "#FFF200"}]

function Home({nickname, setNickname, avatar, setAvatar}:{nickname: string, setNickname:any, avatar:string, setAvatar:any}) {
  const { createLobby, joinLobby, leaveLobby, lobbyId } = usePlayers();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(location.state?.errorMessage||"")
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const { startGame } = useGame()
  const navigate = useNavigate(); // Use the useNavigate hook here

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

  const roomUpdated = () => {
    setRoom((document.getElementById('gameCode') as HTMLInputElement).value)
  };

  function handleJoinLobby() {
    joinLobby(room, nickname, avatar)
  };

  function handleHostLobby() {
    createLobby(nickname, avatar)
  };

  const handleStartGame = (e: any) => {
    e.preventDefault()
    startGame([]) // starting game with empty players will use pre definied players for the game
  };

  return (
    <div className="Home">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="nickname" onChange={nicknameUpdated} value={nickname}></input>
          </div>
          <br></br>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input" id="avatar" onChange={avatarUpdated} value={avatar}>
                  <option className="" value="">Select Color</option>
                  <option className="g" value="#22B14C">Green</option>
                  <option className="r" value="#ED1C24">Red</option>
                  <option className="b" value="#00A2E8">Blue</option>
                  <option className="o" value="#FF7F27">Orange</option>
                  <option className="p" value="#A349A4">Purple</option>
                  <option className="y" value="#FFF200">Yellow</option>
              </select>
          </div>
          <br></br>
          <Link to="/lobby" style={{pointerEvents: (avatar !== "" && nickname !== "") ? 'all' : 'none'}} onClick={handleHostLobby}>Host Game</Link>
          <hr></hr>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" placeholder= "Enter Lobby Code..." id="gameCode" onChange={roomUpdated}></input>
          </div>
          <br></br>
          <Link to="/lobby" style={{pointerEvents: avatar !== "" && nickname !== "" && room !== "" ? 'all' : 'none'}} onClick={handleJoinLobby}>Join Game</Link>
          <hr></hr>
          <Link to="/game" onClick={handleStartGame}>Play Game Locally with 4 players</Link>
          <br></br>
          <br></br>
          <p className="error"><b>{errorMessage}</b></p>
    </div>
  );
}

export default Home;