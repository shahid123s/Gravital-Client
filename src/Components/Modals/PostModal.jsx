import React, { useEffect, useState } from 'react'
import { PostInteraction } from '../PostInteraction';
import { Link } from 'react-router-dom';
import MoreButton from '../../assets/threedot.svg'
import OptionModal from '../User/Report/OptionModal';
import { toast } from 'sonner';
import ACTION_OPTIONS from '../../enum/actionOptions';
import ActionModal from './ActionModal';
import { archivePost, deletePost, publishPost, reportPost } from '../../services/user/modarationServices';
import { axiosInstance } from '../../utilities/axios';

function PostModal({ isOpen, onClose, postDetails, setPostDetails, isArchive, actionHeader }) {
    const [isOptionOpen, setIsOptionModalOpen] = useState(false)
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [actionContext, setActionContext] = useState(null);
 


    const handleOptionModal = () => {
        setIsOptionModalOpen(true)
    }

    const handleOption = async (title) => {
        console.log(postDetails)
        if (title === 'About this Account') {
            const response = await axiosInstance.get('/user/about-profile', {
                params: { username: postDetails.userId.username }
            })
            setActionContext(response.data.user)
            setIsActionModalOpen(title);
            return setIsOptionModalOpen(false);
          
        }

        setIsOptionModalOpen(false);
        await setActionContext(ACTION_OPTIONS.POST[title]);
        setIsActionModalOpen(title);
    }

    const handleAction = async (title, value) => {

        if (title === 'Publish') {
            await publishPost(postDetails._id);
        }
        if (title === 'Delete Post') {
            await deletePost(postDetails._id)
        }
        if (title === 'Archive Post') {
            await archivePost(postDetails._id)
        }
        if (title === 'Report') {
             await reportPost(postDetails._id, postDetails.userId._id, value);
        } 
        toast.success(title)
        setIsActionModalOpen(null);
        setActionContext(null)
        isArchive && setTimeout(() => {
            window.location.reload(); // Reloads the page
        }, 2000);
        onClose()
    }

    console.log(postDetails)
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >

            <button
                className="absolute top-2 right-2 text-black bg-white aspect-square rounded-3xl px-2 shadow-md hover:bg-gray-300"
                onClick={onClose}
            >
                ✕
            </button>

            <div
                className='bg-gray-200 rounded-2xl overflow-hidden gap-10 flex text-black  justify-center w-[80%] p-5 items-center   md:justify-center'
                onClick={(e) => e.stopPropagation()}
            >


                <div
                    className='w-[50%]  overflow-hidden rounded-2xl    justify-center'
                >
                    <img
                        src={postDetails.postUrl || postDetails.fileName}
                        alt=""
                    />

                </div>

                <div
                    className=' bg-inherit flex gap-3 flex-col justify-evenly h-full  w-[50%]'
                >
                    <div className='flex items-center gap-5 bg-inherit justify-between'>
                        <div className='flex items-center gap-5 bg-inherit'>
                            <div className='w-10 h-10 flex items-center overflow-hidden rounded-full  '>
                                <img src={postDetails.userId?.profileImage} alt="" />
                            </div>
                            <Link className='font-poppins text-lg ' to={`/${postDetails.userId.username}`}>{postDetails.userId.fullName} <span className='text-sm text-[#99775C]'> {postDetails.userId.username} </span></Link>
                        </div>
                        <button className='' onClick={handleOptionModal}><img src={MoreButton || ''} alt="" /></button>


                    </div>
                    <div className='bg-gray-300 rounded-lg aspect-square  '>

                    </div>

                    <PostInteraction
                        style={'bottom-0'}
                        postId={postDetails._id}
                        initialLikedByUser={postDetails.likedByUser}
                        isSavedByUser={postDetails.isSavedByUser}
                        likedCount={postDetails.likedCount}
                        key={postDetails._id}
                        disabled={isArchive}

                    />
                    <h1>
                        <span
                            className='text-[#99775C] font-bold'
                        >Caption:
                        </span>
                        {postDetails.caption}
                    </h1>
                </div>

            </div>

            {isOptionOpen && <OptionModal
                OPTION_HEADER={actionHeader}
                setClose={() => setIsOptionModalOpen(false)}
                key={postDetails._id}
                handleOptionActions={handleOption}
            />}
            {isActionModalOpen && <ActionModal
                actionContext={actionContext}
                setClose={() => setIsActionModalOpen(false)}
                title={isActionModalOpen}
                handleAction={handleAction}
            />}
        </div>
    )
}

export default PostModal
