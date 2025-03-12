import React from 'react'
import SiteLogo from '../assets/gravityLogo.png'

function UpdatePage() {
  return (
   <div className = ' bg-[#121212] flex flex-col justify-center items-center h-screen w-[100%] font-poppins text-lg text-white '>
    <img src={SiteLogo} alt="Gravital Logo" />
      This Feature will avaialble on next update.
      <p className='text-sm'>Please co-operative with us</p>
    </div>
  )
}

export default UpdatePage
