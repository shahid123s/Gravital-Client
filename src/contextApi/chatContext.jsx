import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utilities/axios";
import Cookies from 'js-cookie';
import { useSocket } from "./SocketProvider";

const ChatContext = createContext();
const username = Cookies.get('username');

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const socket = useSocket()?.socket;
    const [loading, setLoading] = useState(false);  
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [followList, setFollowList] = useState([]);
    const [conversations, setConversation] = useState(null);
    const [chatDetails, setchatDetails] = useState({});

    useEffect(() => {
        if (!socket) return;

        // ✅ Prevent duplicate listeners
        const handleReceiveMessage = (msg) => {
            console.log("Received message:", msg);
            const messageWithUser = {
                isCurrentUser: msg.username === username,
                ...msg,
            };
            setMessages((prev) => [messageWithUser, ...prev]);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [socket]);

    const fetchChatList = async () => {
        try {
            const chatListResponse = await axiosInstance.get('/chat');
            setChatList(chatListResponse.data.chatList);
        } catch (error) {
            console.error("Error fetching chat list:", error);
        }
    };

    useEffect(() => {
        fetchChatList();
    }, []);

    const handleChange = async (event) => {
        const value = event.target.value;
        if (value === '') return setClose();
        setIsOpen(true);

        try {
            const filteredChatList = await axiosInstance.get('/user/search', { params: { username: value } });
            setFollowList(filteredChatList.data.usersList);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleClick = async (conversationId, chatDetails) => {
        setchatDetails(chatDetails);
        if (socket) socket.emit('joinRoom', conversationId);

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
        try {
            await axiosInstance.post('/chat', { userId });
            fetchChatList();
            setClose();
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    const sendMessage = async (conversationId, message) => {
        try {
            if (!socket) return;
            socket.emit('sendMessage', { roomId: conversationId, message, username });

            await axiosInstance.post('/chat/message', {
                message,
                conversationId,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const setClose = () => setIsOpen(false);

    const handleModel = async () => {
        try {
            const response = await axiosInstance.get('/follow/followings');
            setFollowList(response.data.followList);
            setIsOpen(true);
        } catch (error) {
            console.error("Error fetching follow list:", error);
        }
    };

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
            socket,
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