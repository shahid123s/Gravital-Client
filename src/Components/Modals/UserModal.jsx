import React, { useEffect, useState } from 'react'


function UserModal({isOpen, onClose, userData }) {

   

  console.log(userData)

  const convertDate = (unformatedDate) => {
    const date  = new Date(unformatedDate);
    const formatedDate = date.toLocaleDateString('en-CA');
    return formatedDate
  } 

    if(!isOpen || !userData) return null;
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-[#f9f9f9] p-5 rounded-lg shadow-lg text-center">
     <div className='flex justify-between '> <h2 className=" font-semibold font-poppins mb-4 text-[#333333] text-xl">{userData?.fullName} </h2>
        <button
          className=" text-gray-700 h-fit  rounded-3xl bg-transparent bg-opacity-90 p-1 hover:bg-gray-400  text-xs"
          onClick={onClose}
        >
    ❌
        </button></div>
      <div className="flex justify-center gap-7 items-center">
      <img src={userData.profileImage} alt=""  className='w-36 rounded-md h-fit'/>
        <div className='bg-inherit flex-col items-start'>
            <h1 className='text-[#99775C]'>Username : <span className='text-[#333333]'>{userData?.username}</span></h1>    
            <h1 className='text-[#99775C]'>Email : <span className='text-[#333333]'>{userData?.email}</span></h1>
            <h1 className='text-[#99775C]'>Created At : <span className='text-[#333333]'>{convertDate(userData?.createdAt)}</span> </h1>
            <h1 className='text-[#99775C]'>Updated At : <span className='text-[#333333]'>{convertDate(userData?.updatedAt)}</span>  </h1>
            <h1 className='text-[#99775C]'>Date Of Birth : <span className='text-[#333333]'>{convertDate(userData?.dob)}</span> </h1>
            <h1 className='text-[#99775C]'>Is Blocked : <span className='text-[#333333]'>{userData?.isBlock ? "True" : 'False'}</span> </h1>
            <h1 className='text-[#99775C]'>Is Banned : <span className='text-[#333333]'>{userData?.isBan ? "True" : 'False'}</span> </h1>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserModal
