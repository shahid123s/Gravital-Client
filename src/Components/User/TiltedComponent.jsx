import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-color.svg'

function TiltedComponent({ children, isAdmin }) {
  const [bgColor , setBgColor] = useState('#4A90E2');

  useEffect(() => {
    if(isAdmin){
      setBgColor('#757575')
    }
  },[])

  return (

    <div className="flex flex-col sm:flex-col  justify-center  md:justify-start items-center md:flex-row w-full h-screen md:h-screen  bg-[#F9F9F9] ">
      <img className='w-max-1/3 md:h-full' src={logo} alt="" style={{ width: "46%", }} />
      <div className='w-1/2 ml-auto h-full z-10  items-center justify-center hidden lg:flex '
        style={{
          clipPath: 'polygon(13% 0%, 100% 0%, 100% 100%, 0% 100%)',
          background: `${bgColor}`,


        }}
      >
        {children}
      </div>
      <div className='md:block w-7/12 flex justify-center items-center  lg:hidden  '>
        {children}
      </div>
    </div>

  )
}

export default TiltedComponent
