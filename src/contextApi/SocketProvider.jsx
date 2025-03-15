import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SocketContext = createContext();
const username = Cookies.get("username");

export const useSocket = () => useContext(SocketContext);

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: false, // Don't auto-connect
  auth: { username },
});

function SocketProvider({ children }) {
  useEffect(() => {
    // Connect only if it's not already connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("createOnlineUser", { username });
    });

    socket.on("disconnect", () => console.log("Socket disconnected"));

    // Handle app close (but not refresh)
    const handleClose = (event) => {
      if (document.visibilityState === "hidden") {
        console.log("App closed, disconnecting socket...");
        socket.disconnect();
      }
    };

    document.addEventListener("visibilitychange", handleClose);
    window.addEventListener("beforeunload", handleClose);

    return () => {
      document.removeEventListener("visibilitychange", handleClose);
      window.removeEventListener("beforeunload", handleClose);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;