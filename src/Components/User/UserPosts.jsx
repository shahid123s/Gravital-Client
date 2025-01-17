import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MiniPostCard from './MiniPostCard'
import { axiosInstance } from '../../utilities/axios';

function UserPosts({postDetails, loading}) {

  return (
    <div className='bg-inherit text-lg text-white p-1 flex flex-col font-poppins justify-center items-center gap-10'>
       {!loading && <div className='bg-inherit flex gap-32 flex-wrap'>
            <Link className='hover:text-[#4A90E2]'>Posts</Link>
            <Link className='hover:text-[#4A90E2]'>Poll History</Link>
            <Link className='hover:text-[#4A90E2]'>Tags</Link>
        </div>}
        {!loading && <div className='bg-inherit flex flex-wrap  gap-5  justify-center items-center p-5' >
           {postDetails.map((post) => <MiniPostCard key={post._id} postUrl ={post.postUrl} />)}
        </div>}
    </div>
  )
}

export default UserPosts
