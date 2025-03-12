import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFollow from '../../hooks/toggleFollow'


function SuggestedUserCard({userDetails}) {
  const {isFollowed,toggleFollow} = useFollow()

  return (
    <div className='bg-inherit p-2  flex justify-between'>
    <div className='bg-inherit flex gap-5 items-center'>
      <img src={userDetails.profileImage} alt="" className='w-14 rounded-full' />
      <div className='flex flex-col bg-inherit text-sm font-poppins text-white'>
        <p> {userDetails.fullName}</p>
        <Link className='text-1 text-[#99775C] ' to={`/${userDetails.username}`}>{userDetails.username}</Link>
      </div>
    </div>
    <button className='text-[#4A90E2] text-sm' onClick={() => toggleFollow(userDetails._id)}>{isFollowed? 'Unfollow': 'Follow'}</button>
  </div>
  )
}

export default SuggestedUserCard
