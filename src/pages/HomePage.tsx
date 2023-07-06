import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className="Home">
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="titleInput"></input>
          </div>
          <br></br>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input">
                  <option className="" value="">Select Avatar</option>
                  <option className="" value="Green">Green</option>
                  <option className="" value="Red">Red</option>
                  <option className="" value="Blue">Blue</option>
              </select>
          </div>
          <br></br>
          <Link to="/createGame" state={{ name: "", avatar: "" }}>Create Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/game" state={{ numberOfPlayers: 2}}>Join Game</Link>
    </div>
  );
}

export default Home;