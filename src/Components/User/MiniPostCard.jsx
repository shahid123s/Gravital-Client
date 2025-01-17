import React from 'react'
import { toast } from 'sonner'
function MiniPostCard({postUrl}) {

  const handleClick = () => {
     toast.success('sucsse')
  }

  return (
    <div className='w-72 rounded-lg overflow-hidden' onClick={handleClick}>
      <img src={postUrl} alt="" className='w-full'/>
    </div>
  )
}

export default MiniPostCard
