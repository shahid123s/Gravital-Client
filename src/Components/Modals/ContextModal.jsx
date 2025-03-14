import React from 'react'
import PasswordChangeForm from '../User/settingsComponent/PasswordChangeForm'

function ContextModal({setClose, context}) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#121212] w-[30%] py-5 px-2 text-white  rounded-lg shadow-lg text-center items-center  justify-center flex flex-col ">

            {
                context === 'Change Password' && <PasswordChangeForm/>
            }
            <button onClick={setClose}>Cancel</button>
            </div>
        </div>
    )
}

export default ContextModal
