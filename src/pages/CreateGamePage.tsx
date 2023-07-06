import '../App.css';
import { Game } from "../classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from '../DisplayGame';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'

function CreateGame() {
  const [number_of_players, setNumberOfPlayers] = useState(-1);

  const numberOfPlayerUpdated = () => {
    if (document.getElementById('number_of_players') !== null) {
      setNumberOfPlayers(parseInt((document.getElementById('number_of_players') as HTMLInputElement).value))
    }
  };

  return (
    <div className="Create Game">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <select className="mdl-textfield__input" id="number_of_players" onChange={numberOfPlayerUpdated}>
                <option value="-1">Select number of players</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </div>
        <br></br>
        <Link to="/game" style={{pointerEvents: number_of_players !== -1 ? 'all' : 'none'}} state={{ numberOfPlayers: number_of_players}}>Make Game</Link>
        <br></br>
        or
        <br></br>
        <Link to="/">Go Back</Link>
    </div>
  );
}

export default CreateGame;