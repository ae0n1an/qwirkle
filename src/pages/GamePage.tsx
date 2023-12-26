import '../App.css';
import {useEffect, useState} from 'react';
import { Game } from '../classes/game';
import DisplayGame from '../DisplayGame';
import { useLocation } from 'react-router-dom'

function GamePage({id}:{id: string}) {
  const location = useLocation()
  const { players, isLocal } = location.state

  return (
      <>
        <DisplayGame game = {new Game(players)} isLocal = {isLocal} playerId = {id}></DisplayGame>
      </>
  );
}

export default GamePage;