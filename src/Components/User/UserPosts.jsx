import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MiniPostCard from './MiniPostCard'
import { axiosInstance } from '../../utilities/axios';
import PostModal from '../Modals/PostModal';
import { Heading1 } from 'lucide-react';

function UserPosts({postDetails, loading}) {
   const [isOpenModal, setIsModalOpen] = useState(false)
   const [postData, setPostData] = useState(null)
  return (
    <div className='bg-inherit text-lg text-white p-1 flex flex-col font-poppins justify-center items-center gap-10'>
       {!loading && <div className='bg-inherit flex gap-32 flex-wrap'>
            <Link className='hover:text-[#4A90E2]'>Posts</Link>
            <Link className='hover:text-[#4A90E2]'>Poll History</Link>
            <Link className='hover:text-[#4A90E2]'>Tags</Link>
        </div>}
        {!loading && <div className='bg-inherit flex flex-wrap  gap-5  justify-center items-center p-5' >
           {postDetails.length> 0? postDetails.map((post) => <MiniPostCard key={post._id} post ={post} setIsModalOpen={setIsModalOpen} setPostData = {setPostData} />): 
            <h1 className='text-2xl p-20'>No Post Yet</h1>
           }
        </div>}
        <PostModal 
        isOpen={isOpenModal} 
        onClose={() => setIsModalOpen(false)}
        key={postDetails._id}
        postDetails={postData} 
        className={'bottom-0'}
        />
    </div>
  )
}

export default UserPosts
