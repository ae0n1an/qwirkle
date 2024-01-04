import '../App.css';
import {useEffect, useState} from 'react';
import { Game } from '../classes/game';
import DisplayGame from '../DisplayGame';
import { useLocation } from 'react-router-dom'
import { useSocket } from '../contexts/SocketProvider';
import { usePlayers } from '../contexts/PlayersProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import { useGame } from '../contexts/GameProvider';

function GamePage({id}:{id: string}) {
  const { game } = useGame()

  return (
      <>
        {game !== undefined ? <DisplayGame game = {game} isLocal = {game.getPlayers()[0].getId() === ""} playerId = {id}></DisplayGame> : <></>}
      </>
  );
}

export default GamePage;