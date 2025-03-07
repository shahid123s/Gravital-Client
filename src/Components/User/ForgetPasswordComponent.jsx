import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { axiosInstance } from '../../utilities/axios';

function ForgetPasswordComponent() {
    const location = useLocation();
    const [passwords, setPassword] = useState({
        password: '',
        confirmPassword: '',
        email: location.state?.data?.email
    });
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    useEffect(() =>{
        console.log(location.state);
        
        if(!location.state || location.state.from !== 'otp'){
            navigate('/login', {replace: true})
            console.log('okay', location.state)
        }
    },[navigate])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPassword({...passwords, [name]: value});
        console.log(passwords)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(passwords.password != passwords.confirmPassword){
            setError('Password and Confirm Password Not match');
        }
        else{
            setError(null)
            try {
                console.log('vanna')
                const response = await axiosInstance.post('/auth/user/reset-password', passwords);
                toast.success(response.data?.message);
                navigate('/login')
            } catch (error) {
                console.log(error?.response?.data?.message);
                toast.error(error?.response?.data?.message, {
                    position: 'top-left',
                    closeOnClick: true,
                    draggable: false,
                    style : {backgroundColor : 'transparent'}
                  });
    
            }
        }
    }

  return (
    <div className="pb-5 flex flex-col sm:p-2 sm:w-96 md:w-96 md:p-8 items-center gap-5 rounded-lg justify-center bg-[#f9f9f9]'" >
    <h2 className='text-24px font-poppins font-medium text-[#000]' >Forget Password</h2>
    <form action=""
        onSubmit={handleSubmit}
        className='flex flex-col   gap-3  md:gap-4 w-full '
    >
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="username"
                className='text-[#99775C] font-medium text-lg'
            >Password</label>
            <input
                type="text"
                name="password"
                id="password"
                placeholder='Value'
                onChange={handleChange}
                className='w-76 rounded-md px-3 py-2  border-1 border-black'
            />
        </div>
        <div className='flex flex-col gap-1 w'>
            <label htmlFor="username"
                className='text-[#99775C] font-medium text-lg'
            >Confirm Password</label>
            <input
                type="text"
                name="confirmPassword"
                id="confrim-password"
                onChange={handleChange}
                placeholder='Value'
                className='w-76 rounded-md px-3 py-2  border-1 border-black'

            />
        </div>


        <input type="submit" value="Sign in"
            className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

    </form>
   
</div>
  )
}

export default ForgetPasswordComponent
