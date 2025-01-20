import React from 'react'

function ReportModal({setClose,}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333333] w-96 py-2 px-2 text-white justify-end rounded-lg shadow-lg text-center  flex flex-col gap-2">
              
        
                <button className='text-sm ' onClick={setClose}>Cancel</button>
            </div>
        </div>
    )
}

export default ReportModal
