import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/User/Sidebar'
import UserDetailsDisplay from '../../Components/User/UserProfileDisplayContent'
import UserPosts from '../../Components/User/UserPosts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../Components/Private/UserAuth'
import { axiosInstance } from '../../utilities/axios'
import Footer from '../../Components/Footer'
import Spinner from '../../Components/Spinner'
import useFetchUserData from '../../hooks/fetchUserDetail'


function UserProfile() {
  const navigate = useNavigate()
  const {username} = useParams();
  const {userDetails, refetch} = useFetchUserData(username)
  const [postDetails, setPostDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const  fetchPost =async () => {
      setLoading(true)
      setPostDetails([])
      const response = await axiosInstance.get(`/post/get-users-post`, {
        params: {
          username: username || ''
        }
      });
       console.log(response.data, 'ithaa vanna')
       setPostDetails(response.data.posts)
       setLoading(false)
    }

    fetchPost() 
    refetch(username)

  },[username])
  return (
    <UserAuth>
        <Sidebar />
      {loading && <Spinner/>}
      {!loading && <div className=' min-h-screen flex  '>
        <div className=' min-h-full ml-56 bg-[#757575] w-full flex flex-col'>
          <UserDetailsDisplay userDetails= {userDetails} loading={loading} username={username}  />
          <UserPosts postDetails ={postDetails} />


          <Footer/>
        </div>
      </div>}
    </UserAuth>
  )
}

export default UserProfile
