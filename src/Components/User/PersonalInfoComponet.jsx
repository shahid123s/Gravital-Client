import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validate from '../../utilities/validate';
import {axiosInstance} from '../../utilities/axios';
import { toast } from 'sonner';
function PersonalInfoComponet() {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [validatedError, setValidatedError] = useState(null)
    const [userData, setUserData] = useState({
        fullName :'',
        dob : '',
        phoneNumber : '',
        email : location.state?.data?.email
    })

    useEffect(() => {
      if(location.state?.from != 'otp'){
        navigate('/login')
      }
    },[])

    const handleChange = (event) => {
        const {value, name} = event.target;
        setUserData({...userData, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const validateError = validate(userData);
        setValidatedError(validateError)
        if(Object.keys(validateError).length === 0){
            const response = await axiosInstance.post('/auth/register', userData);
            toast.success(response?.data?.message);
            navigate('/login')
        }
    }


  return (
    <div className='pb-5  flex flex-col gap-5   sm:p-2   sm:w-96   md:w-96  md:p-8 items-center rounded-lg justify-center bg-[#f9f9f9]' >
    <h2 className='text-24px font-poppins font-normal text-[#000]' >PERSONAL INFORMATION</h2>
    {error && <p className='text-red-500'>{error}</p>}
    <form action=""
      onSubmit={handleSubmit}
      className='flex flex-col   gap-3  md:gap-4 w-full '
    >
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor="username"
          className='text-[#99775C] font-medium text-lg'
        >Full Name<span className='text-red-500'>*</span></label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder='Value'
          required
          onChange={handleChange}
          className='w-76 rounded-md px-3 py-2  border-1 border-black'
        />
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor="fullName"
          className='text-[#99775C] font-medium text-lg'
          >Date Of Birth <span className='text-red-500'>*</span></label>
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder='Value'
          required
          onChange={handleChange}
          className='w-76 rounded-md px-3 py-2  border-1 border-black'
        />
      </div>

      <div className='flex flex-col gap-1 w'>
        <label htmlFor="username"
          className='text-[#99775C] font-medium text-lg'
        >Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          onChange={handleChange}
          placeholder='Value'
          className='w-76 rounded-md px-3 py-2  border-1 border-black'

        />
      </div>
      <input type="submit" value="Sign up"
        className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

    </form>

  </div>
  )
}

export default PersonalInfoComponet
