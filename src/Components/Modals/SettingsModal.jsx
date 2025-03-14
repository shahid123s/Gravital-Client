import React from 'react'

function SettingsModal({setClose, title, handleSubmit}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333333] w-[30%] py-5 px-2 text-white  rounded-lg shadow-lg text-center items-center  justify-center flex flex-col gap-2">
                <h1 className='text-xl'>Are you sure you want to {title}?</h1>
                <div className='flex  justify-center gap-5'>
                    <button className='text-sm  p-2 rounded-xl' onClick={() => handleSubmit(title)}>Yes</button>
                    <button className='text-sm  p-2 rounded-xl' onClick={setClose}>No</button>
                </div>
            </div>

        </div>
  )
}

export default SettingsModal
