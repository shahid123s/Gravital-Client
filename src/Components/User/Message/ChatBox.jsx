import { Send, Video, Phone } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../../../contextApi/chatContext';

function ChatBox() {
  const [message, setMessage] = useState('');
  const { conversations, sendMessage, messages, handleChange, chatDetails } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log(messages)

  return (
   <div className='flex-1 h-screen'>
      {conversations ? (
        <div className='flex flex-col flex-1 h-full justify-end'>
          <div className = 'h-20  bg-[#121212] p-3 flex justify-between shadow-2xl text-base font-poppins border-b-[.2px] border-[#828282]'>
            <div className=' flex gap-4'>
            <img src={chatDetails.profileImage} alt="" className='aspect-square h-full rounded-full' />
            <p>{chatDetails.fullName}</p>
            </div>
            <div className=' flex gap-5 items-center'>
              <button> <Video/> </button>
              <button> <Phone size={'21'}/> </button>
            </div>
            </div>

          <div className='flex flex-1 flex-col-reverse  gap-3 px-2 h-full overflow-y-auto pt-5'>
            <div ref={messagesEndRef} />
            {messages.map((text, index) => (
              <p
                key={index}
                className={`flex ${text.isCurrentUser ? 'justify-end' : ''} items-end`}
              >
                <span
                  className={`rounded-lg p-2 text-sm ${
                    text.isCurrentUser ? 'bg-blue-400' : 'bg-gray-600'
                  } text-center min-w-10`}
                >
                  {text.content}
                </span>
              </p>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (message.trim() === '') return;
              sendMessage(conversations, message);
              setMessage('');
            }}
            className='flex gap-2 p-2 mt-auto'
          >
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                
              }}
              placeholder="Send Message"
              className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-white rounded-lg p-2 px-6 placeholder-white/60 outline-none w-[95%]"
            />
            <button type='submit' className='bg-gray-600 p-2 rounded-lg'>
              <Send />
            </button>
          </form>
        </div>
      ) : (
        <div className='align-middle justify-center flex flex-1 h-screen items-center'>
          Select Message
        </div>
      )}
    </div>
  );
}

export default ChatBox;