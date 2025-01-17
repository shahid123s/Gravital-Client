import React, { useEffect } from 'react';
import OPTION_HEADER from '../../../enum/optionHeader';
import { toast } from 'sonner';
import { axiosInstance } from '../../../utilities/axios';

function OptionModal({isPost, OPTION_HEADER, setClose, handleOptionActions}) {
    


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333333] text-white   w-96 py-2 justify-center rounded-lg shadow-lg text-center flex flex-col gap-2">
                
                {OPTION_HEADER.map((option) => (
                    <button key={option.title} className={`font-poppins ${option.color === 'red' ? 'text-red-500': ''} `} onClick={() => handleOptionActions(option.title)}>{option.title}</button>
                ) )}
                <button onClick={setClose}>Cancel</button>
            </div>
        </div>
    )
}

export default OptionModal
