import React from 'react'
import LikeButton from '../../../assets/heart.svg';
import LikedButton from '../../../assets/LikedButton.svg';

function SingleComment({commentDetails}) {

  return (
    <div className = 'flex gap-3 bg-transparent text-base items-center '>
      <img 
      src={commentDetails?.profileImage } 
      alt="User Profile" 
      className='w-8 h-8 rounded-full'
      />
      <p>{commentDetails?.comment}</p>
      <img 
      className='w-4 ml-auto cursor-pointer'

      src={commentDetails?.likedByUser ? LikedButton : LikeButton } alt="" />
    </div>
  )
}

export default SingleComment
