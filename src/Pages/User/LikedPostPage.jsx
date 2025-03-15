import Sidebar from '../../Components/User/Sidebar'
import Spinner from '../../Components/Spinner'
import React, { useState } from 'react'
import MiniPostCard from '../../Components/User/MiniPostCard'
import useLikedPosts from '../../hooks/fetchLikedPost'
import PostModal from '../../Components/Modals/PostModal'
import OPTION_HEADER from '../../enum/optionHeader'

function LikedPostPage() {
    const { error, likedPosts, loading } = useLikedPosts()
    const [isOpen, setIsOpen] = useState(false) 
    const [postData, setPostData] = useState(null);
    return (
        <div className=' min-h-screen flex '>
            <Sidebar />
            <div className='min-h-full ml-56 bg-[#121212] w-full flex flex-col' >
                <h1 className='bg-inherit text-4xl pl-4 pt-2 text-white font-poppins'>
                    Liked Posts
                </h1>
                {loading && <Spinner />}
                <div className='bg-inherit flex gap-3 mt-5 p-7'>
                {!loading && likedPosts.length > 0 ? likedPosts.map((post) => (
                    <MiniPostCard
                        post={post.postId}
                        key={post.postId._id}
                        setIsModalOpen={setIsOpen}
                        setPostData={setPostData}
                    />
                )) : <div className='bg-inherit w-full h-full justify-center flex items-center'>
                    <h1 className='align-middle font-poppins text-white text-2xl'> NO POST LIKED</h1>
                    </div>}

                </div>

            </div>

            {isOpen && <PostModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                postDetails={postData}
                isArchive={false}
                actionHeader={OPTION_HEADER.POST}
            />}

        </div>
    )
}

export default LikedPostPage
