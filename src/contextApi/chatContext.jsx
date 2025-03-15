import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utilities/axios";
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { useSocket } from "./SocketProvider";


const ChatContext = createContext();
const username = Cookies.get('username')

export const useChat = () => useContext(ChatContext);

// // ✅ Ensure socket is only created once
// const socket = io('http://localhost:8000', {
//     transports: ["websocket", "polling"],
//     withCredentials: true,
//     autoConnect: false, // Prevents auto-connect on mount
//     auth: {
//         username,
//     }
// });

export const ChatProvider = ({ children }) => {
    const providedSocket = useSocket();
    const [socket, setSocket] = useState(providedSocket?.socket);
    const [loading, setLoading] = useState(false);  
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [followList, setFollowList] = useState([]);
    const [isReaded, setIsReaded] = useState(true)
    const [lastMessageCount, setLastMessageCount] = useState(messages.length)
    const [conversations, setConversation] = useState(null);
    const [chatDetails, setchatDetails] = useState({});

    useEffect(() => {
        if (messages.length > lastMessageCount) {
            console.log("New message received:", messages[messages.length - 1]);
            setLastMessageCount(messages.length);
        }
    }, [messages])

    const fetchChatList = async () => {
        const chatListResponse = await axiosInstance.get('/chat');
        setChatList(chatListResponse.data.chatList);
        console.log(chatListResponse.data.chatList)
    };


    useEffect(() => {
        fetchChatList();
        if(!socket) return; 
        setSocket(providedSocket?.socket);  
        socket.connect();
       
        // ✅ Listen for new messages in real time
        socket.on("receiveMessage", (msg) => {
            console.log("Received message:", msg);
            const messageWithUser = {
                isCurrentUser: msg.username === username,
                ...msg,
            };

            setMessages((prev) => [messageWithUser, ...prev,]);
        });

        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, [socket]);

    const handleChange = async (event) => {
        const value = event.target.value;
        if(value === '') return setClose();
        setIsOpen(true)
        const filteredChatList = await axiosInstance.get('/user/search',{
            params: {
                username: value,
            }
        })
        setFollowList(filteredChatList.data.usersList)   ;

    }

  


    /** Fetch messages for a conversation */
    const handleClick = async (conversationId, chatDetails) => {
        console.log("Joining room:", conversationId);
        setchatDetails(chatDetails)
        socket.emit('joinRoom', conversationId);

        try {
            const response = await axiosInstance.get('/chat/message', {
                params: { conversationId },
            });
            setConversation(conversationId);

            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const createChat = async (userId) => {
        const response = await axiosInstance.post('/chat', {
            userId,
        });
        console.log(response.data, 'ivda');
        fetchChatList();
        
        setClose()

    }

    /** Send a message */
    const sendMessage = async (conversationId, message) => {
        try {
            const newMessage = { content: message, sender: "You" };

            socket.emit('sendMessage', { roomId: conversationId, message, username });

            await axiosInstance.post('/chat/message', {
                message,
                conversationId,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const setClose = () => {
        setIsOpen(false);
    };

    const handleModel = async () => {
        console.log('clicked')
        const response = await axiosInstance.get('/follow/followings');
        setFollowList(response.data.followList);
        setIsOpen(true);
    }

    return (
        <ChatContext.Provider value={{
            conversations,
            loading,
            setLoading,
            handleClick,
            isOpen,
            sendMessage,
            messages,
            setClose,
            socket: socket,
            chatList,
            chatDetails,
            handleChange,
            handleModel,
            followList,
            createChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
};