import React, { useState } from 'react';
import ProfilePic from '../assets/image.png';
import { Link } from 'react-router-dom';
import MoreButton from '../assets/threedot.svg';

import { axiosInstance } from '../utilities/axios';
import useLike from '../hooks/toggleLike';
import Spinner from './Spinner';
import OptionModal from './User/Report/OptionModal';
import OPTION_HEADER from '../enum/optionHeader';
import ActionModal from './Modals/ActionModal';
import ACTION_OPTIONS from '../enum/actionOptions';
import { reportPost } from '../services/user/modarationServices';
import { toast } from 'sonner';
import Cookies from 'js-cookie'
import { PostInteraction } from './PostInteraction';

function PostCard({ postDetails }) {
    // const {toggleLike } = useLike(postDetails.likedCount, postDetails.likedByUser, postDetails._id)
    // const [isSaved, setIsSaved] = useState(postDetails.isSavedByUser)
    const [isImageLoad, setIsImageLoad] = useState(false);
    const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
    const [actionModal, setActionModal] = useState(null);
    const [actionContext, setActionContext] = useState(null);
    const isUsers = Cookies.get('username') === postDetails.userID.username ? true: false;

    // console.log(postDetails, isSaved)


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
                console.log(postDetails)
                const response = await axiosInstance.get('/about-profile', {
                    params: { username: postDetails.userID.username }
                })
                console.log(typeof response.data.user, 'this reponse')
                setActionContext(response.data.user)
                setActionModal(title);
            } catch (error) {

            }
            console.log(actionContext)
            return

        } 
        if(title === 'Archive Post'){
            try {
                 const response  = await axiosInstance.post('/post/archive',{postId: postDetails._id});
                 console.log(response)
                 return toast.success(response.data.message)
            } catch (error) {
                
            }
        }


        setActionContext(ACTION_OPTIONS.POST[title]);
        setActionModal(title);
    }

    const handleActionModalClose = () => {
        setActionModal(null);
        setActionContext(null)
    }

    const handleAction = async (title, message) => {
        if(title === 'Report'){
            await reportPost(postDetails._id, postDetails.userID._id, message);
        }
        toast.success(title)
        setActionModal(null);
        setActionContext(null);
    }

    return (
        <div className='flex flex-col justify-center items-center font-poppins w-[99%] px-4 py-7 rounded-2xl gap-5'>
            <div className='flex justify-between text-[#99775C]  h-11 w-11/12'>
                <div className='flex items-center gap-5'>
                    <div className='w-10 h-10 flex items-center overflow-hidden rounded-full'>
                        <img src={postDetails.userID?.profileImage} alt="" />
                    </div>
                    <Link className='font-poppins text-lg' to={`/${postDetails.userID.username}`}>{postDetails.userID.fullName} <span className='text-sm'> {postDetails.userID.username} </span></Link>

                </div>
                <button onClick={handleOption}><img src={MoreButton} alt="" /></button>
                {isOptionModalOpen && <OptionModal
                    OPTION_HEADER={isUsers? OPTION_HEADER.USERPOST : OPTION_HEADER.POST}
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

                {isImageLoad ? <img   onLoad={loadImage} src={postDetails.postUrl} alt="" /> : <Spinner fill={true} />}
                <img src={postDetails.postUrl} onLoad={loadImage} className='hidden' />

            </div>

                <PostInteraction
                    isSavedByUser={postDetails.isSavedByUser}
                    postId={postDetails._id}
                    initialLikedByUser={postDetails.likedByUser}
                    likedCount={postDetails.likedCount}
                />
           {/* <div className='w-11/12 flex  justify-around '> ith oru component akkanam marakkallee...... */}
                {/* <button className='  flex gap-4 items-center ' onClick={toggleLike} ><img className='w-5' src={likedByUser ? LikedButton : LikeButton} alt="" />{likes}</button> */}
                {/* <button className='  flex gap-4 items-center '><img className='w-6' src={CommentButton} alt="" />1.2K</button> */}
                {/* <button className='  flex gap-4 items-center '><img className='w-5' src={ReachBtn} alt="" />1.2K</button> */}
                {/* <button className='  flex gap-4 items-center '><img className='w-5' src={ShareButton} alt="" />1.2K</button> */}
                {/* <button className='  flex gap-4 items-center '><img className='w-5' onClick={() => toggleSavePost(postDetails._id)} src={isSaved ? SavedButton : SaveButton} alt="" /></button> */}

            {/* </div> */}
        </div>
    )
}

export default PostCard
