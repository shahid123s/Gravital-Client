import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utilities/axios';
import validate from '../../utilities/validate';
import { toast } from 'sonner'

function RegisterComponent() {
  const [error, setError] = useState();
  const [validatedError, setValidatedError] = useState(null)
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();



  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value })

  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (userData.confirmPassword != userData.password) {
        return setError('Password and Confirm Password is not match')
      }
      setError(null)
      const validateError = validate(userData);
      setValidatedError(validateError)
      console.log(validatedError)
      if (Object.keys(validateError).length === 0) {
        const response = await axiosInstance.post('/auth/send-otp', userData)
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: 'top-left',
          closeOnClick: true,
          draggable: false,
          style: { backgroundColor: 'transparent' }
        })
        const expireTime = Date.now() + 2 * 60 * 1000;
        navigate('/otp-verification', { state: { expireTime, email: userData.email, from: 'register' } })
      }
      if (Object.keys(validateError).length == 4) {
        setError('Please Enter the details properly')
        setValidatedError({})
      }

    } catch (error) {
      console.log(error.response.data.message);

      setError(error.response.data.message)
    }
  }

  return (
    <div className='pb-5  flex flex-col gap-5   sm:p-2   sm:w-96   md:w-96  md:p-8 items-center rounded-lg justify-center bg-[#f9f9f9]' >
      <h2 className='text-24px font-poppins font-normal text-[#000]' >REGISTER</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <form action=""
        onSubmit={handleSubmit}
        className='flex flex-col   gap-3  md:gap-4 w-full '
      >
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
          >Username</label>
          {validatedError?.username && <p className='text-red-600 font-light text-sm'  >{validatedError?.username}</p>}
          <input
            type="text"
            name="username"
            id="username"
            placeholder='Value'
            required
            onChange={handleChange}
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
          />
        </div>



        <div className='flex flex-col gap-1 w'>
          <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
          >Email</label>
          {validatedError?.email && <p className='text-red-600 font-light text-sm'  >{validatedError?.email}</p>}
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={handleChange}
            placeholder='Value'
            className='w-76 rounded-md px-3 py-2  border-1 border-black'

          />
        </div>

        <div className='flex flex-col gap-1 w'>
          <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
          >Password</label>
          {validatedError?.password && <p className='text-red-600 font-light text-sm'  >{validatedError?.password}</p>}
          <input
            type="text"
            name="password"
            id="password"
            required
            onChange={handleChange}
            placeholder='Value'
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
          />
        </div>
        <div className='flex flex-col gap-1 w'>
          <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
          >Confirm Password</label>
          <input
            type="text"
            required
            onChange={handleChange}
            name="confirmPassword"
            id="confirmPassword"
            placeholder='Value'
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
          />
        </div>
        <input type="submit" value="Sign up"
          className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

      </form>
      <Link className='text-[#99775C] cursor-pointer hover:underline' to={'/login'}>Already have account?</Link>

    </div>
  )
}

export default RegisterComponent
