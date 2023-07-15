import React from 'react';
import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';

const ROOM_ID_SIZE = 10;

function Home() {
  const [nickname, setNickname] = useState("")
  const [avatar, setAvatar] = useState("")

  const nicknameUpdated = () => {
    setNickname((document.getElementById('nickname') as HTMLInputElement).value)
  };

  const avatarUpdated = () => {
    setAvatar((document.getElementById('avatar') as HTMLInputElement).value)
  };

  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className="Home">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="nickname" onChange={nicknameUpdated}></input>
          </div>
          <br></br>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input" id="avatar" onChange={avatarUpdated}>
                  <option className="" value="">Select Avatar</option>
                  <option className="g" value="Green">Green</option>
                  <option className="r" value="Red">Red</option>
                  <option className="b" value="Blue">Blue</option>
              </select>
          </div>
          <br></br>
          <Link to="/lobby" style={{pointerEvents: (avatar !== "" && nickname !== "") ? 'all' : 'none'}} state={{name: nickname, avatar: avatar, room:makeid(ROOM_ID_SIZE)}}>Host Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/join" state={{name: nickname, avatar: avatar}}>Join a Game</Link>
    </div>
  );
}

export default Home;