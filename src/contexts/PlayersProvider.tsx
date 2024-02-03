import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

type PlayersContextType = {
    lobbyId: string,
    players: PlayerType[],
    isHost: boolean,
    createLobby: (name: string, avatar: string) => void,
    joinLobby: (providedLobbyId: string, name: string, avatar: string) => void,
    leaveLobby: () => void
}

const PlayersContext = React.createContext<PlayersContextType>({
    lobbyId: "",
    players: [],
    isHost: false,
    createLobby: (name: string, avatar: string) => {},
    joinLobby: (providedLobbyId: string, name: string, avatar: string) => {},
    leaveLobby: () => {}
})

export type PlayerType = {
    id: string,
    name: string,
    avatar: string
}

export function usePlayers() {
  return useContext(PlayersContext)
}

export function PlayersProvider({ id, children } : {id: string, children: ReactNode}) {
    const [players, setPlayers] = useLocalStorage("players", [])
    const [lobbyId, setLobbyId] = useLocalStorage("lobbyId", "")
    const socket = useSocket()
    const navigate = useNavigate(); // Use the useNavigate hook here

    const updateLobby = useCallback(({lobbyId, lobby}: {lobbyId: string; lobby: {host: PlayerType, players:PlayerType[]}}) => {
        setLobbyId(lobbyId);
        setPlayers(lobby.players)
    }, [setPlayers, id])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-lobby', updateLobby)

        return () => { socket.off('receive-lobby') }
    }, [socket, updateLobby])

    useEffect(() => {
        if (socket == null) return
    
        const disconnectedFromGame = () => {
            navigate('/', { state: { errorMessage: "Disconnected from game"} });
        };
    
        socket.on('disconnected-from-game', disconnectedFromGame)
    
        return () => { socket.off('disconnected-from-game') }
      }, [socket])
    

    function joinLobby(providedLobbyId: string, name: string, avatar:string) {
        socket?.emit('join-lobby', { lobbyId: providedLobbyId, newPlayer: {id:id, name:name, avatar:avatar}})
    }

    function createLobby(name: string, avatar:string) {
        let newlobbyId = uuidV4();
        socket?.emit('create-lobby', { lobbyId: newlobbyId, player: {id:id, name:name, avatar:avatar}})
    }

    function leaveLobby() {
        socket?.emit('leave-game', {lobbyId: lobbyId, playerId: id})
    }

    return (
        <PlayersContext.Provider value={{ players, lobbyId, isHost : players.length > 0 && id === players[0].id , createLobby, joinLobby, leaveLobby}}>
            {children}
        </PlayersContext.Provider>
    )
}