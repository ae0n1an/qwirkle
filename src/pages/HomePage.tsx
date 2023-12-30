import '../App.css';
import { Game } from "../classes/game";
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { usePlayers } from '../contexts/PlayersProvider';
import { useSocket } from '../contexts/SocketProvider';

const LOCAL_PLAYERS = [{id: "", name: "player1", avatar: ""}, {id: "", name: "player2", avatar: ""}, {id: "", name: "player3", avatar: ""}, {id: "", name: "player4", avatar: ""}]

function Home({nickname, setNickname, avatar, setAvatar}:{nickname: string, setNickname:any, avatar:string, setAvatar:any}) {
  const { createLobby, joinLobby, leaveLobby, lobbyId } = usePlayers();
  const [errorMessage, setErrorMessage] = useState("")
  const [room, setRoom] = useState("");
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

  const roomUpdated = () => {
    setRoom((document.getElementById('gameCode') as HTMLInputElement).value)
  };

  function handleHostLobby() {
    createLobby(nickname, avatar)
  };

  function handleJoinLobby() {
    joinLobby(room, nickname, avatar)
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
          <Link to="/game" state={{game: new Game(LOCAL_PLAYERS).serialize(), isLocal:true}}>Play Game Locally with 4 players</Link>
          <br></br>
          <br></br>
          <p  className="error"><b>{errorMessage}</b></p>
    </div>
  );
}

export default Home;