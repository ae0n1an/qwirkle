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
    
    //https://qworkle-server.onrender.com
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

    useEffect(() => {
      const heartbeatInterval = setInterval(() => {
        // Send a heartbeat message to the server
        if (socket) {
          socket.emit('heartbeat');
        }
      }, 10000); // send every 10 seconds
  
      // Clean up the interval when the socket is closed or component unmounts
      return () => {
        clearInterval(heartbeatInterval);
      };
    }, [socket]);

    /*

    useEffect(() => {
      if (socket == null) return

      socket.on('heartbeat-recieved', updateLobby)

      return () => { socket.off('heartbeat-recieved') }
    }, [socket, updateLobby])

    */

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}