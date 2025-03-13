import React from 'react'
import SiteLogo from '../assets/gravityLogo.png'


function NotFoundPage() {
  return (
    <div className='bg-[#121212] flex flex-col justify-center items-center h-screen w-[100%] font-poppins text-lg text-white'>
    {/* Add the spin animation */}
    <img src={SiteLogo} alt="Gravital Logo" className='w-64 animate-spin-slow rounded-2xl' />
    This feature will be available in the next update.
    <p className='text-sm'>Please cooperate with us</p>
  </div>
  )
}

export default NotFoundPage
