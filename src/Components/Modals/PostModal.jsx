import React from 'react'
import { PostInteraction } from '../PostInteraction';

function PostModal({ isOpen, onClose, postDetails, handleAction }) {


    console.log(postDetails)
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >

            <div
                className='bg-gray-200 rounded-2xl overflow-hidden gap-10 flex text-black  justify-center w-[80%] p-5 items-center   md:justify-center'
                onClick={(e) => e.stopPropagation()}
            >


                <div
                    className='w-[50%] overflow-hidden rounded-2xl aspect-square  justify-center'
                >
                    <img
                        src={postDetails.postUrl || postDetails.fileName}
                        alt=""
                    />

                </div>

                <div
                    className=' bg-inherit flex flex-col justify-between h-full '
                >

                    <h1>
                        <span
                            className='text-[#99775C] font-bold'
                        >Caption:
                        </span>
                        {postDetails.caption}
                    </h1>

                    <PostInteraction
                        style={'bottom-0'}
                    />
                </div>

            </div>


        </div>
    )
}

export default PostModal
