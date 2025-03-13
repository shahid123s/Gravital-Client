import React from 'react'
import {motion} from 'framer-motion'
import SiteLogo from '../assets/gravityLogo.png'


function NotFoundPage() {
  return (
    <div className='bg-[#121212] flex flex-col gap justify-center items-center h-screen w-[100%] font-poppins text-lg text-white'>
    {/* Add the spin animation */}
    <motion.img 
        src={SiteLogo} 
        alt="Gravital Logo" 
        className="w-64 pb-5"
        initial={{ scale: 0.8, opacity: 0.5 }} // Start smaller and slightly transparent
        animate={{ scale: 1, opacity: 1 }} // Grow to normal size
        transition={{
          duration: 2.2,  // Animation duration
          repeat: Infinity, // Infinite loop
          repeatType: "reverse", // Go back and forth
          ease: "easeInOut" // Smooth transition
        }}
      />
    <h1 className='text-4xl'>404 </h1>
    <p className='text-sm'>This Page is Not Found</p>
  </div>
  )
}

export default NotFoundPage
