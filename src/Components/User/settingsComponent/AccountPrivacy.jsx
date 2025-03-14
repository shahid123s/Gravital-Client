import React, { useState } from 'react'
import Spinner from '../../Spinner'
import { ChevronRight } from 'lucide-react'
import SettingsModal from '../../Modals/SettingsModal'
import ContextModal from '../../Modals/ContextModal'

function AccountPrivacy() {
    const [loading, setLoading] = useState(false)
    const [isPasswordOpen, setIsPasswordOpen] = useState(false)
    const [isUsernameOpen, setIsUsernameOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [context, setContext] = useState('')

    
    const setClose = () => {
        setIsPasswordOpen(false)
        setIsUsernameOpen(false)
        setIsDeleteOpen(false)
        
    }
    const handleOpenContextModal = (context) => {
        setContext(context);
        setClose()

    }
    return (
        <div className='bg-[#121212] w-full ml-[608px] flex-col flex p-5 gap-14 '>
            {loading && <Spinner />}
            {!loading &&
                <div>
                    <h1 className='text-2xl font-poppins text-white font-normal'>
                        Account Privacy
                    </h1>
                    <div className=' flex-col gap-4 text-white rounded-xl mx-10 p-4 my-5 flex justify-between items-center'>
                        <button className='bg-transparent flex justify-between w-full hover:opacity-70 '
                            onClick={() => {
                                setIsPasswordOpen(!isPasswordOpen)
                                setIsUsernameOpen(false)
                                setIsDeleteOpen(false)
                            }}
                        >
                            Change Password
                            <ChevronRight />
                        </button>
                    </div>
                    <div className=' flex-col gap-4 text-white rounded-xl mx-10 p-4 my-5 flex justify-between items-center'>
                        <button className='bg-transparent flex justify-between w-full hover:opacity-70 '
                            onClick={() => {
                                setIsUsernameOpen(!isUsernameOpen)
                                setIsPasswordOpen(false)
                                setIsDeleteOpen(false)
                            }}
                        >
                            Change Username
                            <ChevronRight />
                        </button>
                    </div>
                    <div className=' flex-col gap-4 text-red-500 rounded-xl mx-10 p-4 my-5 flex justify-between items-center'>
                        <button className='bg-transparent flex justify-between w-full hover:opacity-70 '
                            onClick={() => {
                                setIsDeleteOpen(!isDeleteOpen)
                                setIsPasswordOpen(false)
                                setIsUsernameOpen(false)
                            }}
                        >
                            Delete Account
                            <ChevronRight color='white' />
                        </button>
                    </div>

                    {isPasswordOpen && <SettingsModal setClose={setClose} title={'Change Password'} handleSubmit={handleOpenContextModal} />}
                    {isUsernameOpen && <SettingsModal setClose={setClose} title={'Change Username'} handleSubmit={handleOpenContextModal} />}
                    {isDeleteOpen && <SettingsModal setClose={setClose} title={'Delete Account'} handleSubmit={handleOpenContextModal} />}

                </div>
            }

            {context && <ContextModal context={context} setClose ={() => setContext('')} />}


        </div>
    )
}

export default AccountPrivacy
