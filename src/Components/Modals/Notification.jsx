import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utilities/axios';
import { useSocket } from '../../contextApi/SocketProvider';

function Notification({isOpen}) {
    const {socket} = useSocket();
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        socket.on('receiveNotification', (notification) => {
            console.log('Recived Notification', notification);
            setNotification((prev) => [notification, ...prev]);
        })

        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, [socket])


    return (
        <div
            className={`fixed flex flex-col h-screen z-40 items-center w-96 ml-56 bg-[#121212] pt-4 p-4 transition-all duration-700 ease-in-out shadow-md shadow-white
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 invisible scale-95 translate-y-5'}
            `}
        >
           <h1 className='font-poppins text-white text-[24px] mr-auto'>Notification</h1>
            <div className='w-full h-full flex flex-col justify-start bg-transparent p-10 gap-4'>
                {notification.length > 0 ? (
                    notification.map(user => (
                        <div className="flex flex-col gap-7 w-full bg-transparent" key={user._id}>
                            <div className="flex items-center justify-start gap-5 text-white">
                                <img src={user.profileImage} alt="" className="w-12 rounded-full border border-white/30" />
                               <div>
                               <p className=" font-poppins ">{user.message}</p>
                               <p className=" font-poppins text-xs text-[#828282] ">{user.username}</p>
                               </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex w-full h-full  items-center bg-transparent p-10   ">
                        <p className="   rounded-lg p-2 w-fit text-white font-medium  ">
                            Notification
                        </p>
                    </div>
                )}
                {/* <p className="rounded-lg p-2 w-fit text-white font-medium">
                    No user Found
                </p> */}
            </div>
        </div>
    );
}

export default Notification
