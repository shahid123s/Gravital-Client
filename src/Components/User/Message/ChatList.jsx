import React, { useEffect, useState } from 'react';
import UseChatDetails from './UseChatDetails';
import { axiosInstance } from '../../../utilities/axios';
import { useChat } from '../../../contextApi/chatContext';

function ChatList() {
    // const [chatList, setChatList] = useState([]);
    const { handleModel, chatList } = useChat();

    // useEffect(() => {
    //     const fetchChatList = async () => {
    //         const chatListResponse = await axiosInstance.get('/chat');
    //         setChatList(chatListResponse.data.chatList);
    //     };

    //     fetchChatList();
    // }, []);

    return (
        <div className='py-9 w-[25%] px-2 p-10 gap-5 flex flex-col border-r-[.1px] border-[#828282] max-h-screen overflow-y-auto scrollbar-hide'>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    pattern="[a-zA-Z\s]"
                    className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-white rounded-lg p-2 px-6 placeholder-white/60 outline-none  w-full"
                />
            </div>
            <div className='px-3 gap-5 flex flex-col'>
                {chatList.length > 0 ? chatList.map(chat => (
                    <UseChatDetails key={chat._id} userDetail={chat} />
                )) : (
                    <div className='flex w-full h-screen justify-center items-center'>
                        <button className='bg-[#4A90E2] h-fit rounded-lg p-2 w-fit' onClick={handleModel}>
                            Send Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatList;