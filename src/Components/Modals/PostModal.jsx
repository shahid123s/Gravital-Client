import React from 'react'

function PostModal({ isOpen, onClose, postDetails, handleAction }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className='w-11/12 overflow-hidden rounded-2xl aspect-square flex justify-center'>
             <img onDoubleClick={toggleLike} onLoad={loadImage} src={postDetails.postUrl} alt="" />
            </div>


        </div>
    )
}

export default PostModal
