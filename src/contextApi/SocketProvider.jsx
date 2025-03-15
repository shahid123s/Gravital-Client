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
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        // ✅ Ensure event listeners are added only once
        const handleConnect = () => {
            console.log("Socket connected:", socket.id);
            socket.emit('createOnlineUser', { username });
        };

        const handleDisconnect = () => console.log("Socket disconnected");

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
