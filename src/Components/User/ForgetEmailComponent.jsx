import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utilities/axios'

function ForgetEmailComponent() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value)
        console.log(email)
    }

    const handleSubmit =async (event) => {
        event.preventDefault()
       const response = await axiosInstance.post('/reset-password/email', {email});
       const expireTime = Date.now() + 2 * 60 * 1000 ;
        navigate('/otp-verification' ,{state :{expireTime, email, isResetPassword: true, from: 'reset-password'}})
       console.log(response)
    }
    return (
        <div className="pb-5 flex flex-col sm:p-2 sm:w-96 md:w-96 md:p-8 items-center gap-5 rounded-lg justify-center bg-[#f9f9f9] ">
            <h2 className='text-24px font-poppins font-medium text-[#000]' >Enter the Email</h2>
            <form action=""
                onSubmit={handleSubmit}
                className='flex flex-col   gap-3  md:gap-4 w-full '
            >
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="username"
                        className='text-[#99775C] font-medium text-lg'
                    >Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder='Value'
                        onChange={handleChange}
                        className='w-76 rounded-md px-3 py-2  border-1 border-black'
                    />
                </div>
                <input type="submit" value="Sign in"
                    className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />
            </form>
            <Link className='text-[#99775C] cursor-pointer hover:underline' to={'/login'}>Back to Login</Link>
        </div>
    )
}

export default ForgetEmailComponent
