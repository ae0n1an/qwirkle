import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { Game } from '../classes/game';
import { useNavigate } from 'react-router-dom';
import { PlayerType, usePlayers } from './PlayersProvider';

const LOCAL_PLAYERS = [{id: "", name: "Green", avatar: "#22B14C"}, {id: "", name: "Red", avatar: "#ED1C24"}, {id: "", name: "Blue", avatar: "#00A2E8"}, {id: "", name: "Orange", avatar: "#FF7F27"}]

type GameContextType = {
    game?: Game,
    startGame: (players: PlayerType[]) => void
}

const GameContext = React.createContext<GameContextType>({
    game: new Game([]),
    startGame: () => {}
})

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ id, children } : {id: string, children: ReactNode}) {
    const [game, setGame] = useLocalStorage("game", new Game([]).serialize())
    const { players } = usePlayers()
    const socket = useSocket()
    const navigate = useNavigate(); // Use the useNavigate hook here

    const updateGame = useCallback(({game}: {game: any}) => {
        setGame(game);
    }, [setGame, game])

    useEffect(() => {
        if (socket == null) return
    
        socket.on('game-updated', updateGame)
    
        return () => { socket.off('game-updated') }
    }, [socket])

    useEffect(() => {
        if (socket == null) return
    
        const gameStarted = ({ game }: { game: any }) => {
            updateGame({game})
            navigate('/game');
        };
    
        socket.on('game-started', gameStarted)
    
        return () => { socket.off('game-started') }
    }, [socket, updateGame])

    function startGame(players: PlayerType[]) {
        if (players.length !== 0) {
            socket?.emit('start-game', { playerId: id, game: new Game(players).serialize()})
        } else {
            setGame(new Game(LOCAL_PLAYERS).serialize())
            navigate('/game');
        }
    }

    return (
        <GameContext.Provider value={{ startGame, game: Game.deserialize(game) }}>
            {children}
        </GameContext.Provider>
    )
}