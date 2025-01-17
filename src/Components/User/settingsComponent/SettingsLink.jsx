import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function SettingsLink({logo, name}) {
  const navigate = useNavigate();

  const link = name.toLowerCase().replace(/ /g, '-');

    const handleChange = () => {

    }
    const handleClick = () => {
        event.preventDefault();
        navigate(`/settings/${link}`);
    }
  return (
    <div className='flex  bg-inherit gap-3 justify-start items-center cursor-pointer' onClick={handleClick }>
    <img src={logo} alt="" className='w-6 bg-inherit'  />
    <p className={`bg-inherit text-white  font-light  font-poppins`}  to={`}`}>{name}</p>
    </div>
  )
}

export default SettingsLink
