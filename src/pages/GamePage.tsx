import '../App.css';
import {useEffect, useState} from 'react';
import { Game } from '../classes/game';
import DisplayGame from '../DisplayGame';
import { useLocation } from 'react-router-dom'

function GamePage() {
  const location = useLocation()
  const { numberOfPlayers } = location.state

  return (
      <>
        <DisplayGame game = {new Game(numberOfPlayers)}></DisplayGame>
      </>
  );
}

export default GamePage;