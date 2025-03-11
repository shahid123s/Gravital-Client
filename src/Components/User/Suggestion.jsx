import React, { useState, useEffect } from 'react'
import ProfilePic from '../../assets/image.png'
import SuggestedUserCard from './SuggestedUserCard'
import Footer from '../Footer'
import useFetchUserData from '../../hooks/fetchUserDetail'
import { axiosInstance } from '../../utilities/axios'
function Suggestion({userDetails}) {

  const [suggestionList, setSuggestionList] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSuggestion = async () => {
     const response = await axiosInstance.get('/user/suggest-users');
    setSuggestionList(response.data.usersList);
    setLoading(false)

    }
    fetchSuggestion()
   },[])

  return (
    <div className='h-fit flex flex-col bg-[#121212] w-[22%] p-1  gap-3 items-center'>
      <div className='bg-inherit py-2 flex justify-start gap-5 items-center '>
        <img src={userDetails.profileImage} alt="" className='w-[20%] rounded-full ' />
        <div className='flex flex-col bg-inherit font-poppins text-white'>
          <p> {userDetails.fullName} </p>
          <p className='text-sm text-[#99775C] '>{userDetails.username}</p>
        </div>
        {/* <button className='text-[#4A90E2]'>Switch</button> */}
      </div>
      <div className='bg-inherit w-full flex justify-between px-3 '>
        <h4 className='text-[#828282]'>Suggestion For You</h4>
        <button className='text-[#99775C]'>More</button>
      </div>
      <div className=' bg-inherit flex flex-col w-full gap-1 '>        
      
        {!loading &&suggestionList.map((users) => <SuggestedUserCard key={users._id} userDetails={users} /> )
          }

      </div>



      <Footer/>
 
    </div>
  )
}

export default Suggestion
