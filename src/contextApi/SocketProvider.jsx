import React, { createContext, useContext, useEffect, } from 'react'
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext();   
const username = Cookies.get('username');

export const useSocket = () => useContext(SocketContext);

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ["websocket", "polling"],
    withCredentials: true,
    autoConnect: false, // Prevents auto-connect on mount
    auth: {
        username,
        
    }
});

function SocketProvider({ children }) {
    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.emit('createOnlineUser', {username})
    socket.on("disconnect", () => console.log("Socket disconnected"));
   

    useEffect(() => {
        socket.connect();    
    }, []);


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
  )
}

export default SocketProvider
