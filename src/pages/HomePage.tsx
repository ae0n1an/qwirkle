import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Home() {
  const [clickable, setClickable] = useState(false);

  const infoUpdated = () => {
    if ((document.getElementById('nickname') as HTMLInputElement).value !== "" && (document.getElementById('avatar') as HTMLInputElement).value !== "") {
      setClickable(true)
    } else {
      setClickable(false)
    }
  };

  return (
    <div className="Home">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="nickname" onChange={infoUpdated}></input>
          </div>
          <br></br>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input" id="avatar" onChange={infoUpdated}>
                  <option className="" value="">Select Avatar</option>
                  <option className="g" value="Green">Green</option>
                  <option className="r" value="Red">Red</option>
                  <option className="b" value="Blue">Blue</option>
              </select>
          </div>
          <br></br>
          <Link to="/createGame" style={{pointerEvents: clickable ? 'all' : 'none'}} state={{ name: "", avatar: "" }}>Create Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/game" style={{pointerEvents: clickable ? 'all' : 'none'}} state={{ numberOfPlayers: 2}}>Join Game</Link>
    </div>
  );
}

export default Home;