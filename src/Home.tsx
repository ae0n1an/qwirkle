import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from './DisplayGame';
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className="Home">
        <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" placeholder= "Enter Name..." id="titleInput"></input>
        </div>
        <br></br>
        <Link to="/game">Start Game</Link>
    </div>
  );
}

export default Home;