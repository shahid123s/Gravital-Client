import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/User/Sidebar'
import useArchivedPosts from '../../hooks/fetchArchivePost';
import MiniPostCard from '../../Components/User/MiniPostCard';
import PostModal from '../../Components/Modals/PostModal';



function Archive() {
    const {archivePosts, loading,error} = useArchivedPosts()
   const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState(null);

  return (
    <div className=' min-h-screen flex '>
        <Sidebar/>
        <div className='min-h-full ml-56 bg-[#757575] w-full flex flex-col' >
        <h1 className='bg-inherit text-4xl pl-4 pt-2 text-white font-poppins'>Archive Posts</h1>

            <div className='bg-inherit flex gap-3 mt-5 p-7'>
            {archivePosts.map((post) => (
                <MiniPostCard
                     post={post.postId}
                     key={post.postId._id}
                     setIsModalOpen={setIsOpen}
                     setPostData={setPostData}
                />
            ))}
            </div>
            <PostModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              postDetails={postData}
            />

        </div>
    </div>
  )
}

export default Archive
