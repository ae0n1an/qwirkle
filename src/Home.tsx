import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from './DisplayGame';
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className="Home">
          <h6>Nickname:</h6>
          <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" placeholder= "Enter Nickname..." id="titleInput"></input>
          </div>
          <br></br>
          <h6>Avatar:</h6>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
              <select className="mdl-textfield__input">
                  <option className="" value="">Select Avatar</option>
                  <option className="" value="Green">Green</option>
                  <option className="" value="Red">Red</option>
                  <option className="" value="Blue">Blue</option>
              </select>
          </div>
          <br></br>
          <Link to="/createGame">Create Game</Link>
          <br></br>
          or
          <br></br>
          <Link to="/game">Join Game</Link>
    </div>
  );
}

export default Home;