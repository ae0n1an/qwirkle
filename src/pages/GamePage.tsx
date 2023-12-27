import '../App.css';
import {useEffect, useRef, useState} from 'react';
import { Game } from '../classes/game';
import DisplayGame from '../DisplayGame';
import { useLocation } from 'react-router-dom'
import { useSocket } from '../contexts/SocketProvider';
import { usePlayers } from '../contexts/PlayersProvider';

function GamePage({id}:{id: string}) {
  const location = useLocation()
  const { isHost } = usePlayers()
  const { isLocal, game } = location.state
  const [serializedGame, setSerializedGame] = useState(game)
  const socket = useSocket()

  useEffect(() => {
    // Code to run only when the component is mounted (first opened)
    if (isHost && !isLocal && socket) {
      socket.emit('start-game', { playerId: id, game: game});
    }
  }, [])

  useEffect(() => {
    if (socket == null) return

    const gameUpdated = ({ game }: { game: any }) => {
      setSerializedGame(game)
    };

    socket.on('game-updated', gameUpdated)

    return () => { socket.off('game-updated') }
  }, [socket])

  return (
      <>
        <DisplayGame game = {Game.deserialize(serializedGame)} isLocal = {isLocal} playerId = {id}></DisplayGame>
      </>
  );
}

export default GamePage;