import React, { useEffect, useState } from 'react'
import SocketProvider from '../../contextApi/SocketProvider'
import Sidebar from '../../Components/User/Sidebar'
import { axiosInstance } from '../../utilities/axios';
import PostCard from '../../Components/PostCard';
import useFetchUserData from '../../hooks/fetchUserDetail';

function Trending() {
    const {userDetails} = useFetchUserData();
    const [postDetails, setPostDetials] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axiosInstance.get('/post/get-trending')
            console.log(response.data.posts)
            setPosts(response.data.posts)
        }
        fetchPost()
    }, [])

    return (
        <div className=' min-h-screen flex '>
            <SocketProvider>
                <Sidebar />
            </SocketProvider>
            <div className='flex justify-evenly w-full bg-[#121212]'>
                <div className='ml-64  flex flex-col h-full justify-center items-center w-[60%] bg-inherit text-[#E6EDF3] pb-10 '>
                    <div className='bg-[#121212] w-11/12  px-10 py-5 h-full flex flex-col gap-10  items-center'>

                      
                        {/* <AddPostModel/> */}
                        {posts.map(post => (
                            <PostCard postDetails={post} key={post._id} />
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Trending
