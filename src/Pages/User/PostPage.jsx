import React, { useEffect, useState } from 'react'
import SocketProvider from '../../contextApi/SocketProvider'
import Sidebar from '../../Components/User/Sidebar'
import PostCard from '../../Components/PostCard'
import Spinner from '../../Components/Spinner'
import { axiosInstance } from '../../utilities/axios'
import { useParams } from 'react-router-dom'
import { UserAuth } from '../../Components/Private/UserAuth'


function PostPage() {
    const [postDetails, setPostDetails] = useState(null)
    const {postId} = useParams();
    useEffect(() => {
        const fetchPostDetail =async ( ) => {
            const reponse = await axiosInstance.get(`/post`, {
                params: {
                    postId,
                }
            })
            console.log(reponse.data.post)
            setPostDetails(reponse.data.post)
        }
        fetchPostDetail()
    }, [])
    return (
        <UserAuth>
            
        <div className=' min-h-screen flex '>
            <SocketProvider>
                <Sidebar />
            </SocketProvider>
            <div className='flex justify-evenly w-full bg-[#121212]'>
                <div className='ml-64  flex flex-col h-full justify-center items-center w-[60%] bg-inherit text-[#E6EDF3] pb-10 '>
                    <div className='bg-[#121212] w-11/12  px-10 py-5 h-full flex flex-col gap-10  items-center'>

                       {postDetails ? <PostCard postDetails={ postDetails} />: <Spinner/>}

                    </div>


                </div>
            </div>

        </div>
        </UserAuth>
    )
}

export default PostPage
