import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
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
  )
}

export default Footer
