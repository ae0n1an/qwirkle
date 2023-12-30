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
  const [serializedGame, setSerializedGame] = useState(Game.deserialize(game))
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
      // Set the players hand to their current hand on their screen so that swapped tokens stay
      // in their current location 
      setSerializedGame((prevState: Game) => {
        game.players[game.players.findIndex((p: any) => p.id === id)].tokens = (prevState.getPlayerById(id).getTokens().map(token => ({
          colour: token.getColour(),
          shape: token.getShape()
        })))
        return Game.deserialize(game);
      });
    };

    socket.on('game-updated', gameUpdated)

    return () => { socket.off('game-updated') }
  }, [socket])

  return (
      <>
        <DisplayGame game = {serializedGame} isLocal = {isLocal} playerId = {id}></DisplayGame>
      </>
  );
}

export default GamePage;