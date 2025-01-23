import React from 'react'
import ActionButton from '../Buttons/ActionButton';

function AdminPostDetailsModal({ isOpen, onClose, postData, handleAction }) {


    if (!isOpen) return null

    const convertDate = (unformatedDate) => {
        const date = new Date(unformatedDate);
        const formatedDate = date.toLocaleDateString('en-CA');
        return formatedDate
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"> 
            <div className="bg-[#f9f9f9] p-5 rounded-lg shadow-lg text-center">
                <div className='flex justify-between '> <h2 className=" font-semibold font-poppins mb-4 text-[#333333] text-xl">Post Info </h2>
                    <button
                        className=" text-gray-700 h-fit  rounded-3xl bg-transparent bg-opacity-90 p-1 hover:bg-gray-400  text-xs"
                        onClick={onClose}
                    >
                        ❌
                    </button>
                </div>
                <div className="flex justify-center gap-7 items-center">
                    <img src={postData.fileName} alt="" className='w-36 rounded-md h-fit' />
                    <div className='bg-inherit flex-col items-start'>
                        <h1 className='text-[#99775C]'>Username : <span className='text-[#333333]'>{postData?.userID.username}</span></h1>

                        <h1 className='text-[#99775C]'>Caption : <span className='text-[#333333]'>{postData?.caption}</span></h1>
                        <h1 className='text-[#99775C]'>Created At : <span className='text-[#333333]'>{convertDate(postData?.uploadDate)}</span> </h1>

                        <h1 className='text-[#99775C]'>Is Restricted : <span className='text-[#333333]'>{postData?.isRestricted ? "True" : 'False'}</span> </h1>
                        <h1 className='text-[#99775C]'>Is Premium : <span className='text-[#333333]'>{postData?.isPostBoost ? "True" : 'False'}</span> </h1>
                    </div>
                </div>
                {postData.actions.map((action) => (
                    <ActionButton
                        key={action.title}
                        title={action.title}
                        buttonColor={action.color}
                        handleAction={handleAction}
                    />
                ) )}
            </div>
        </div>
    )
}

export default AdminPostDetailsModal
