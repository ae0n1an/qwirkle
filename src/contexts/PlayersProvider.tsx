import React, { ReactNode, useCallback, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSocket } from './SocketProvider'
import { v4 as uuidV4 } from 'uuid';

type PlayersContextType = {
    lobbyId: string,
    players: PlayerType[],
    createLobby: (name: string, avatar: string) => void,
    joinLobby: (providedLobbyId: string, name: string, avatar: string) => void
}

const PlayersContext = React.createContext<PlayersContextType>({
    lobbyId: "",
    players: [],
    createLobby: (name: string, avatar: string) => {},
    joinLobby: (providedLobbyId: string, name: string, avatar: string) => {}
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
    const [players, setPlayers] = useLocalStorage('players', [])
    const [lobbyId, setLobbyId] = useLocalStorage('lobbyId', "")
    const socket = useSocket()

    const addPlayerToLobby = useCallback((players: PlayerType[]) => {
        setPlayers(players)
    }, [setPlayers])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-lobby', addPlayerToLobby)

        return () => { socket.off('receive-lobby') }
    }, [socket, addPlayerToLobby])


    function addPlayer(id: string, name: string, avatar: string) {
        setPlayers((prevPlayers : PlayerType[]) => {
        return [...prevPlayers, { id, name, avatar }]
        })
    }

    function joinLobby(providedLobbyId: string, name: string, avatar:string) {
        socket?.emit('join-lobby', { lobbyId: providedLobbyId, newPlayer: {id:id, name:name, avatar:avatar}})
        setLobbyId(providedLobbyId);
    }

    function createLobby(name: string, avatar:string) {
        let newlobbyId = uuidV4();
        socket?.emit('create-lobby', { lobbyId: newlobbyId, player: {id:id, name:name, avatar:avatar}})
        setLobbyId(newlobbyId);
        setPlayers([{id:id, name:name, avatar:avatar}])
    }

  return (
        <PlayersContext.Provider value={{ players, lobbyId, createLobby, joinLobby }}>
            {children}
        </PlayersContext.Provider>
    )
}