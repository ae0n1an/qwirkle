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
            'https://qworkle-server.onrender.com', 
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
        if (socket && socket.connected) {
          socket.emit('heartbeat');
        }
      }, 10000); // send every 10 seconds
  
      // Clean up the interval when the socket is closed or component unmounts
      return () => {
        clearInterval(heartbeatInterval);
      };
    }, [socket]);

    useEffect(() => {
      if (socket == null) return;
    
      // Set up the listener for the 'heartbeat-recieved' event
      socket.on('heartbeat-recieved', () => {
        console.log('Heartbeat received from the server');
        // Additional logic if needed
      });
    
      // Clean up the listener when the component unmounts
      return () => {
        socket.off('heartbeat-recieved');
      };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}