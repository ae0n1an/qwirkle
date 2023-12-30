import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSocket } from './SocketProvider'
import { v4 as uuidV4 } from 'uuid';

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

type PlayerType = {
    id: string,
    name: string,
    avatar: string
}

export function usePlayers() {
  return useContext(PlayersContext)
}

export function PlayersProvider({ id, children } : {id: string, children: ReactNode}) {
    const [players, setPlayers] = useState<PlayerType[]>([])
    const [isHost, setHost] = useState(false)
    const [lobbyId, setLobbyId] = useState<string>("")
    const socket = useSocket()

    const updateLobby = useCallback(({lobbyId, lobby}: {lobbyId: string; lobby: {host: PlayerType, players:PlayerType[]}}) => {
        setLobbyId(lobbyId);
        setPlayers(lobby.players)
        setHost(lobby.host.id == id)
    }, [setPlayers])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-lobby', updateLobby)

        return () => { socket.off('receive-lobby') }
    }, [socket, updateLobby])

    function joinLobby(providedLobbyId: string, name: string, avatar:string) {
        socket?.emit('join-lobby', { lobbyId: providedLobbyId, newPlayer: {id:id, name:name, avatar:avatar}})
    }

    function createLobby(name: string, avatar:string) {
        let newlobbyId = uuidV4();
        socket?.emit('create-lobby', { lobbyId: newlobbyId, player: {id:id, name:name, avatar:avatar}})
    }

    function leaveLobby() {
        socket?.emit('leave-lobby', {lobbyId: lobbyId, playerId: id})
    }

  return (
        <PlayersContext.Provider value={{ players, lobbyId, isHost, createLobby, joinLobby, leaveLobby}}>
            {children}
        </PlayersContext.Provider>
    )
}