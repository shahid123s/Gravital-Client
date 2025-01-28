import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react'

function Sorting({filter, setFilter}) {
    const [options, setOptions] = useState(['All', 'User', 'Post'])
    const [dropdown, setDropdown] = useState(false);

    const hanldeDropDown = () => {
        setDropdown(prev => !prev)
    }
  return (
    <div className= 'bg-gray-700 text-white rounded-md align-middle w-20 px-2 py-1 text-center text-sm overflow-hidden ' >
        <button onClick={hanldeDropDown} className ='flex items-center justify-center' >Sort <ChevronRight size={16}/> </button>
        {dropdown && <div className='absolute left-60 px-6 w-20 py-2 bg-inherit rounded-lg flex flex-col overflow-hidden shadow-md' >
            {options.map(option => (
                <button className='text-start' onClick={() => {
                    setFilter(option)
                    hanldeDropDown()
                }}>
                    {option}</button>
            ))}
            </div>
            }
    </div>
  )


}

export default Sorting

