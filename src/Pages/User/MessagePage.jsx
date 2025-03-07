import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserAuth } from '../../Components/Private/UserAuth'
import Sidebar from '../../Components/User/Sidebar'
import Spinner from '../../Components/Spinner'
import ChatList from '../../Components/User/Message/ChatList';
import ChatBox from '../../Components/User/Message/ChatBox';
import { ChatProvider, useChat } from '../../contextApi/chatContext';
import UserListModal from '../../Components/Modals/UserListModal';
import { io } from 'socket.io-client';
import SocketProvider from '../../contextApi/SocketProvider';



function MessagePage() {
    const { loading, isOpen, followingList, setClose } = useChat();
    useEffect(() => {

    }, []);

    return (
        <UserAuth>
            <Sidebar />
            <SocketProvider >

                <ChatProvider>

                    {loading && <Spinner />}
                    {!loading && <div className=' min-h-screen flex  '>
                        <div className=' min-h-full ml-56 bg-[#121212] w-full flex text-white'>
                            <ChatList />
                            <ChatBox />
                        </div>
                    </div>}
                    <UserListModal isOpen={isOpen} users={followingList} onClose={setClose} />

                </ChatProvider>
            </SocketProvider>

        </UserAuth>
    )
}

export default MessagePage
