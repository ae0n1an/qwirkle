import React, { ReactNode, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type PlayersContextType = {
    players: {
        id: string, 
        name : string 
    }[],    
    createPlayer (id: string, name: string) : void
};

export const PlayersContext = React.createContext<PlayersContextType>(
    {
        players: [],
        createPlayer(id: string, name: string){}
    })

export function usePlayers() {
  return useContext(PlayersContext)
}

export function PlayersProvider({ children } : { children: ReactNode }) {
  const [players, setPlayers] = useLocalStorage('players', [])

  function createPlayer(id: string, name : string) {
    setPlayers((prevPlayers : { id: string, name : string }[] )=> {
      return [...prevPlayers, { id, name }]
    })
  }

  return (
    <PlayersContext.Provider value={{ players, createPlayer }}>
      {children}
    </PlayersContext.Provider>
  )
}
