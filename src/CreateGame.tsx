import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from './DisplayGame';
import { Link } from 'react-router-dom'

function CreateGame() {

  return (
    <div className="Create Game">
        <h6>Number Of Players:</h6>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <select className="mdl-textfield__input">
                <option className="" value="">Select number of players</option>
                <option className="2" value="Green">2</option>
                <option className="3" value="Red">3</option>
                <option className="4" value="Blue">4</option>
                <option className="5" value="Green">5</option>
                <option className="6" value="Red">6</option>
                <option className="7" value="Blue">7</option>
                <option className="8" value="Blue">8</option>
            </select>
        </div>
        <br></br>
        <Link to="/game">Make Game</Link>
    </div>
  );
}

export default CreateGame;