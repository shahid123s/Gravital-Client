import { ChevronRight, ShieldCheck } from 'lucide-react'
import React from 'react'

function ActionModal({ title, actionContext, setClose, handleAction }) {

 

    console.log(actionContext.profileImage)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333333] w-96 py-2 px-2 text-white justify-end rounded-lg shadow-lg text-center  flex flex-col gap-2">
                {/* <p className='text-red-500'>{title}</p> */}
                {actionContext.title ? <p className='text-md text-red-500'>{actionContext.title}</p> :
                    <div className='bg-inherit flex items-center p-2 gap-5'>
                        <div className='w-24 overflow-hidden rounded-full h-24 flex justify-center items-center  bg-zinc-600'>
                            <img src={actionContext.profileImage} alt="" className='' />
                        </div>
                        <div className='bg-inherit flex-1  justify-start'>
                        <p className='font-poppins text-[#99775C]'>{actionContext.username}</p>
                        <p className='opacity-50 text-start'>To help keep our community authentic, we're showing information about accounts</p>
                        </div>

                    </div>


                }

                <hr className='border-white border-solid border-0' />

                {actionContext?.messages && actionContext.messages.map((message) => (
                    <button className='text-[#F3F3F3F3] text-sm flex justify-between text-left items-center gap-2 ' > <message.icon className='w-10' />  <span className='opacity-50 '>{message.text} </span>   </button>

                ))}

                {actionContext?.options ? actionContext.options.map((option) => (
                    <button className='text-[#F3F3F3F3] text-sm flex justify-between  ' onClick={() => handleAction(title, option)} >{option} <ChevronRight /> </button>
                )) : actionContext?.value ? <button className='text-[#4A90E2] text-md  '  onClick={() => handleAction(title, actionContext.value)}>{actionContext.value}  </button> : <p>Date joined : {actionContext.createdAt} </p>}

                <button className='text-sm ' onClick={setClose}>Cancel</button>
            </div>

        </div>
    )
}

export default ActionModal
