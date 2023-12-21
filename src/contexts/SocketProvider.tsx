import React, { ReactNode, useContext, useEffect, useState } from 'react'
import {io, Socket} from 'socket.io-client'

export function useSocket() {
    return useContext(SocketContext)
}

export const SocketContext = React.createContext<Socket| undefined>(
    {} as Socket
    // for escaping the eslint error
    // you can write something like this instead to match your 
    // predefined type
    /*
    {
        socket: io(),
      ...
    }
    */
);

export function SocketProvider({ id, children } : {id: string, children: ReactNode}) {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000', 
            { 
                query: { id },
                transports : ['websocket']
            }
        )
        setSocket(newSocket)

        return () => { newSocket.close() }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}