import React from 'react'
import { UserAuth } from '../../Components/Private/UserAuth'
import Sidebar from '../../Components/User/Sidebar'
import UserPosts from '../../Components/User/UserPosts'
import UserDetailsDisplay from '../../Components/User/UserProfileDisplayContent'
import { Link } from 'react-router-dom';
function Favourites() {
  return (
    <UserAuth>
    <div className=' min-h-screen flex '>
     <Sidebar/>
     <div className=' min-h-full ml-56 bg-[#757575] w-full flex flex-col'>
        <UserDetailsDisplay/>
        <UserPosts/>


      <div className='bg-inherit w-full flex flex-wrap p-5 gap-x-5 text-[#4A90E2] justify-center text-[12px]'> 
        <Link>About</Link>
        <Link>Hlep</Link>
        <Link>Terms & Policies</Link>
        <Link>Location</Link>
        <Link>Cookies Policy</Link>
        <Link>Ads</Link>
        <Link>Developer</Link>
        <Link> &#169;2024 Gravity Media </Link>
      </div>
        </div>

    </div>
     </UserAuth>
  )
}

export default Favourites
