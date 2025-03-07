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
import SingleComment from '../User/Comments/SingleComment';
import { Send } from 'lucide-react';
import { getComments, sendComment } from '../../services/user/commentService';
import {v4 as uuid} from 'uuid'

function PostModal({ isOpen, onClose, postDetails, isArchive, actionHeader }) {
    const [postId, setPostId] = useState(postDetails?._id);
    const [isOptionOpen, setIsOptionModalOpen] = useState(false)
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [actionContext, setActionContext] = useState(null);
    const [comments, setComments] = useState([]);  

    useEffect(() => {
    
        const fetchComments = async () => {
            const response = await getComments(postId);
            setComments(prev => [...prev, ...response]);
        }
        fetchComments();
       
    }, postDetails)

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
            setIsActionModalOpen(title);t
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            _id: uuid(),
            comment: e.target.comment.value,
        }

        console.log(comment)

        if (!comment) return;
        await sendComment(postId, comment.comment);
        setComments(prev => [comment, ...prev]);
        e.target.comment.value = '';
   
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
                className='bg-black/90 rounded-2xl overflow-hidden gap-10 flex text-white/70  justify-center w-[80%] p-5 items-center   md:justify-center'
                onClick={(e) => e.stopPropagation()}
            >


                <div
                    className='w-[50%]  bg-transparent overflow-hidden rounded-2xl    justify-center'
                >
                    <img
                        src={postDetails.postUrl || postDetails.fileName}
                        alt=""
                    />

                </div>

                <div
                    className=' bg-transparent flex gap-3 flex-col justify-evenly h-full  w-[50%]'
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
                    <div className='bg-transparent h-[99%] text-base backdrop-blur-md rounded-lg aspect-square p-1 flex flex-col  shadow-lg '>
                        <div
                            className='p-4 flex flex-col gap-5 overflow-y-auto thin-scrollbar flex-1'
                        >
                            {comments.map(comment => (
                                <SingleComment commentDetails={comment} key={comment._id} />
                            ))}
                        </div>
                        <form
                            className='mt-auto flex gap-2 px-2 py-1 items-center'
                            onSubmit={handleSubmit}
                        >
                            <input type="text" name="comment" id="" placeholder='Add a comment'
                                className='bg-white/50 backdrop-blur-lg border border-white/30 shadow-lg text-black rounded-lg p-2 px-6 placeholder-black/60 outline-none w-full h-10 text-base' />

                            <button type="submit"><Send /></button>
                        </form>
                    </div>

                    <PostInteraction
                        style={'bottom-0'}
                        postId={postDetails._id}
                        initialLikedByUser={postDetails.likedByUser}
                        isSavedByUser={postDetails.isSavedByUser}
                        commentCount={postDetails.commentCount}
                        likedCount={postDetails.likedCount}
                        key={postDetails._id}
                        disabled={isArchive}
                        shareCount={postDetails.shareCount}
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
