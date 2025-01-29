import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/User/Sidebar'
import UserDetailsDisplay from '../../Components/User/UserProfileDisplayContent'
import UserPosts from '../../Components/User/UserPosts'
import { Link, replace, useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../Components/Private/UserAuth'
import { axiosInstance } from '../../utilities/axios'
import Footer from '../../Components/Footer'
import Spinner from '../../Components/Spinner'
import useFetchUserData from '../../hooks/fetchUserDetail';
import Cookies from  'js-cookie';


function UserProfile() {
  const navigate = useNavigate()
  const {username} = useParams();
  const {userDetails, refetch} = useFetchUserData(username)
  const [postDetails, setPostDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(username === Cookies.get('username')){
      return navigate('/profile', replace)
    } 
    console.log(username, 'username')
    const  fetchPost =async () => {
      setLoading(true)
      setPostDetails([])
      const response = await axiosInstance.get(`/post/get-users-post`, {
        params: {
          username: username || ''
        }
      });
      setLoading(false)
       console.log(response.data, 'ithaa vanna')
       setPostDetails(response.data.posts)
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
          <UserPosts postDetails ={postDetails} userDetails = {userDetails} isCurrentUser= {username ? false: true} />


          <Footer/>
        </div>
      </div>}
    </UserAuth>
  )
}

export default UserProfile
