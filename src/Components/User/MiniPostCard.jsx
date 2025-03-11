import React from 'react'
import { toast } from 'sonner'
function MiniPostCard({post, setIsModalOpen, setPostData}) {
  
  const handleClick = () => {
      setIsModalOpen(true)
      setPostData(post
        
      )
  }

  return (
    <div className='w-72 rounded-lg overflow-hidden' onClick={handleClick}>
      <img src={post.postUrl|| post.fileName} alt="" className='w-full'/>
    </div>
  )
}

export default MiniPostCard
