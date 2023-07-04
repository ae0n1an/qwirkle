import './App.css';
import { Game } from "./classes/game";
import { Routes, Route } from 'react-router-dom';
import DisplayGame from './DisplayGame';
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className="Home">
        <Link to="/game">Start Game</Link>
    </div>
  );
}

export default Home;