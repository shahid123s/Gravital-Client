import React, { useState } from 'react'
import Spinner from '../../Spinner'

function AccountPrivacy() {
    const [loading, setLoading] = useState(false)
    return (
        <div className='bg-[#121212] w-full ml-[608px] flex-col flex p-5 gap-14 '>
            {loading && <Spinner />}
            {!loading &&
                <div>
                    <h1 className='text-2xl font-poppins text-white font-normal'>
                        Account Privacy
                    </h1>
                    <div className=' bg-white/10  backdrop-blur-md border border-white/20  resize-none overflow-hidden text-white placeholder-gray-300 rounded-xl mx-10 p-3 my-5 flex justify-between items-center'>
                        <h1>
                            Change Password
                        </h1>
                        

                    </div>
                </div>
            }

        </div>
    )
}

export default AccountPrivacy
