import React, { createContext } from 'react'
import Sidebar from '../../Components/User/Sidebar'
import Content from '../../Components/User/Content'
import Suggestion from '../../Components/User/Suggestion'
import { UserAuth } from '../../Components/Private/UserAuth'
import useFetchUserData from '../../hooks/fetchUserDetail'

function Home() {
   const {userDetails} = useFetchUserData()



  return (
     <UserAuth>
    <div className=' min-h-screen flex '>


     <Sidebar  />
      <div className='flex justify-evenly w-full'>
      <Content profileImage = {userDetails.profileImage} />
      <Suggestion userDetails={userDetails}/>
      </div>
    </div>
     </UserAuth>
  )
}

export default Home
