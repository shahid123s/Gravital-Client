import React, { useState } from 'react';
import LikeButton from '../assets/heart.svg';
import LikedButton from '../assets/LikedButton.svg';
import CommentButton from '../assets/comment.svg';
import ShareButton from '../assets/share.svg';
import SaveButton from '../assets/savePostLogo.svg';
import SavedButton from '../assets/saved-logo.svg';
import ReachBtn from '../assets/graph.svg';
import useLike from '../hooks/toggleLike';
import { axiosInstance } from '../utilities/axios';
import { toast } from 'sonner';

export function PostInteraction({ likedCount, initialLikedByUser, postId, isSavedByUser, handleModelOpen, style, commentCount, shareCount, ...props }) {
    const { likes, likedByUser, toggleLike } = useLike(likedCount, initialLikedByUser, postId)

    const [isSaved, setIsSaved] = useState(isSavedByUser)
    const [share, setShare] = useState(shareCount)

    const toggleSavePost = async (postId) => {
        setIsSaved(!isSaved);
        const response = await axiosInstance.patch('/save/post', { postId });

    }

    const hanldeShare = async () => {
        const response = await axiosInstance.patch('/post/share', { postId });
        await navigator.clipboard.writeText(response.data.data)
        setShare(prev => prev + 1)
        toast.success('Link copied to clipboard')
    }

    return (
        <div className={`w-11/12 flex  justify-around bg- rounded-md bg-inherit ${style} `}> {/* ith oru component akkanam marakkallee...... */}
            <button
                className='  flex gap-4 items-center disabled:cursor-not-allowed '
                onClick={toggleLike} {...props}
            >
                <img
                    className='w-5'
                    src={likedByUser ? LikedButton : LikeButton}
                    alt=""
                />
                {likes || 0}
            </button>
            <button
                className='  flex gap-4 items-center disabled:cursor-not-allowed '{...props}
                onClick={handleModelOpen}
            >
                <img
                    className='w-6'
                    src={CommentButton}
                    alt=""
                />
                {commentCount || 0}
            </button>
            <button
                className='  flex gap-4 items-center disabled:cursor-not-allowed'{...props}
            >
                <img
                    className='w-5'
                    src={ReachBtn}
                    alt=""
                />
                1.2K
            </button>
            <button
                className='  flex gap-4 items-center disabled:cursor-not-allowed' {...props}
                onClick={hanldeShare}
            >
                <img
                    className='w-5'
                    src={ShareButton}
                    alt=""
                />
                {share || 0}
            </button>
            <button
                className='  flex gap-4 items-center disabled:cursor-not-allowed' {...props}
            >
                <img
                    className='w-5'
                    onClick={() => toggleSavePost(postId)}
                    src={isSaved ? SavedButton : SaveButton}
                    alt="" />
            </button>

        </div>
    )
}