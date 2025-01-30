import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../../utilities/axios';
import PostCard from '../PostCard';
import AddPostComponent from '../AddPostComponent';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const  fetchPost =async (page) => {
  const response = await axiosInstance.get(`/post/get-post?page=${page}`);

  return {
    data: response.data.posts,
    hasMore: response.data.hasMore
  }
}

function Content({profileImage}) {
  const {data: posts, loadMore, isLoading, hasMore }  = useInfiniteScroll(fetchPost);

  useEffect(() => {
    const handleScroll = () => {
      if(window.innerHeight + document.documentElement. scrollTop >= document.documentElement.offsetHeight - 600){
        loadMore();
        console.log('thudangi')
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll) ;
  }, [loadMore]);




  
  return (
    <div className='ml-64  flex flex-col h-full justify-center items-center w-[60%] bg-inherit text-[#E6EDF3]  '>
      <div className='bg-[#121212] w-11/12  px-10 py-5 h-full flex flex-col gap-20  items-center'>
        
    <AddPostComponent  profileImage = {profileImage} />
    {/* <AddPostModel/> */}
       {posts.map( post => (
        <PostCard postDetails={post} key={post._id} />
       ) ) }
      </div>

      
    </div>
  )
}

export default Content