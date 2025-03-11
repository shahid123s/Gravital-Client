import React, { useState } from 'react'
import ProfilePic from '../../../assets/images.png'
import { useChat } from '../../../contextApi/chatContext'


function UseChatDetails({userDetail}) {
    const {handleClick} = useChat()
    const [isReaded, setIsReaded] = useState(false);
    return (
        <div className='flex cursor-pointer  rounded-lg w-60 overflow-hidden items-center  justify-between p-1' onClick={() =>handleClick(userDetail._id, {profileImage: userDetail.profileImage, fullName: userDetail.chatName})} >
            <div className='  rounded-sm  p-r-3 overflow-hidden flex gap-3  ' >
                <img src={userDetail.profileImage} alt="Profile Image" className=' w-10 rounded-full aspect-square' />
                <div className=' flex flex-col items-start'>
                    <p className='text-[15px]' >{userDetail.chatName || userDetail.username}</p>
                    <p className='text-[12px]' >Last Message</p>
                </div>
            </div>
            {isReaded && <div className='w-2 bg-[#4A90E2] aspect-square z-30 rounded-full' />}
        </div>
    )
}

export default UseChatDetails
