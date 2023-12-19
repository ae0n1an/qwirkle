import React, { ReactNode, useContext, useEffect, useState } from 'react'
import {io, Socket} from 'socket.io-client'

export interface ChatSocketCtxState {
    socket: Socket;
}

export const SocketContext = React.createContext<ChatSocketCtxState| undefined>(
    {} as ChatSocketCtxState
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
    const [socket, setSocket] = useState<ChatSocketCtxState>()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000', 
            { 
                query: { id },
                transports : ['websocket']
            }
        )
        setSocket({socket: newSocket})

        return () => { newSocket.close() }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}