import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreButton from '../assets/threedot.svg';
import { axiosInstance } from '../utilities/axios';
import Spinner from './Spinner';
import OptionModal from './User/Report/OptionModal';
import OPTION_HEADER from '../enum/optionHeader';
import ActionModal from './Modals/ActionModal';
import ACTION_OPTIONS from '../enum/actionOptions';
import { archivePost, deletePost, reportPost } from '../services/user/modarationServices';
import { toast } from 'sonner';
import Cookies from 'js-cookie'
import { PostInteraction } from './PostInteraction';
import PostModal from './Modals/PostModal';

function PostCard({ postDetails }) {
    // const {toggleLike } = useLike(postDetails.likedCount, postDetails.likedByUser, postDetails._id)
    // const [isSaved, setIsSaved] = useState(postDetails.isSavedByUser)
    const [isImageLoad, setIsImageLoad] = useState(false);
    const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
    const [actionModal, setActionModal] = useState(null);
    const [actionContext, setActionContext] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isUsers = Cookies.get('username') === postDetails.userId.username ? true : false;




    const loadImage = () => {
        setIsImageLoad(true)
    }


    const handleOption = () => {
        setIsOptionModalOpen(!isOptionModalOpen);
    }

    const handleActionModal = async (title) => {
        setIsOptionModalOpen(false)
        if (title === 'About this Account') {
            try {
                const response = await axiosInstance.get('/user/about-profile', {
                    params: { username: postDetails.userId.username }
                })
                setActionContext(response.data.user)
                setActionModal(title);
            } catch (error) {

            }
            return

        }
       
        setActionContext(ACTION_OPTIONS.POST[title]);
        setActionModal(title);
    }

    const handleActionModalClose = () => {
        setActionModal(null);
        setActionContext(null)
    }

    const handleAction = async (title, message) => {
        if (title === 'Report') {
            await reportPost(postDetails._id, postDetails.userId._id, message);
        }  else if( title === 'Archive Post'){
            await archivePost(postDetails._id);
        } else if( title === 'Delete Post'){
            await deletePost(postDetails._id);
        }

        toast.success(title)
        setActionModal(null);
        setActionContext(null);
    }

    const handleModelOpen = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div className='flex flex-col justify-center items-center font-poppins w-[99%] px-4 py-7 bg-[] shadow-lg text-[#E6EDF3] rounded-2xl gap-5'>
            <div className='flex justify-between text-[#99775C]  h-11 w-11/12'>
                <div className='flex items-center gap-5'>
                    <div className='w-10 h-10 flex items-center overflow-hidden rounded-full'>
                        <img src={postDetails.userId?.profileImage} alt="" />
                    </div>
                    <Link className='font-poppins text-lg' to={`/${postDetails.userId.username}`}>{postDetails.userId.fullName} <span className='text-sm text-[#828282]'> {postDetails.userId.username} </span></Link>

                </div>
                <button onClick={handleOption}><img src={MoreButton} alt="" /></button>
                {isOptionModalOpen && <OptionModal
                    OPTION_HEADER={isUsers ? OPTION_HEADER.USERPOST : OPTION_HEADER.POST}
                    setClose={handleOption}
                    handleOptionActions={handleActionModal}
                />}
                {actionModal && <ActionModal
                    title={actionModal}
                    setClose={handleActionModalClose}
                    actionContext={actionContext}
                    handleAction={handleAction}
                />}
            </div>
            <div className='flex w-11/12'>
                <p className='font-poppins '>
                    {postDetails.caption}
                </p>
            </div>

            <div className='w-11/12 overflow-hidden rounded-2xl aspect-square flex justify-center'>

                {isImageLoad ? <img onLoad={loadImage} src={postDetails.postUrl} alt="" /> : <Spinner fill={true} />}
                <img src={postDetails.postUrl} onLoad={loadImage} className='hidden' />

            </div>

            <PostInteraction
                isSavedByUser={postDetails.isSavedByUser}
                postId={postDetails._id}
                initialLikedByUser={postDetails.likedByUser}
                likedCount={postDetails.likedCount}
                handleModelOpen={handleModelOpen}
                commentCount={postDetails.commentCount}
                shareCount={postDetails.shareCount}
            />

            <PostModal 
            isOpen={isModalOpen}
            postDetails={postDetails}
            onClose={handleModelOpen}
            actionHeader={isUsers ? OPTION_HEADER.USERPOST : OPTION_HEADER.POST}
            />
            
        </div>
    )
}

export default PostCard
