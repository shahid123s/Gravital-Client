import React, { useState } from 'react'
import { axiosInstance } from '../../utilities/axios';
import { use } from 'react';


function SeachModel({ isOpen }) {
    const [userList, setUserList] = useState([]);

    const handleChange = async (event) => {
        const response =await axiosInstance.get('/user/search',{
            params: {
                username: event.target.value
            }   
        });

        console.log(response.data.usersList);  
        setUserList(response.data.usersList);
    }

    return (
        <div
            className={`fixed flex flex-col h-screen z-40 items-center w-96 ml-56 bg-[#121212] pt-4 p-4 transition-all duration-700 ease-in-out shadow-md shadow-white
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 invisible scale-95 translate-y-5'}
            `}
        >
            <input
                type="text"
                placeholder="Search"
                pattern="[a-zA-Z\s]"
                onChange={handleChange}
                className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-white rounded-lg p-2 px-6 placeholder-white/60 outline-none w-[80%] h-10"
            />
            <div className='w-full h-full flex flex-col justify-start bg-transparent p-10 gap-4'>
                {userList.length > 0 ? (
                    userList.map(user => (
                        <div className="flex flex-col gap-7 w-full bg-transparent" key={user._id}>
                            <div className="flex items-center justify-start gap-5 text-white">
                                <img src={user.profileImage} alt="" className="w-12 rounded-full border border-white/30" />
                               <div>
                               <p className=" font-poppins ">{user.fullName}</p>
                               <p className=" font-poppins text-xs text-[#828282] ">{user.username}</p>
                               </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex w-full h-full  items-center bg-transparent p-10   ">
                        <p className="   rounded-lg p-2 w-fit text-white font-medium  ">
                            No user Found
                        </p>
                    </div>
                )}
                {/* <p className="rounded-lg p-2 w-fit text-white font-medium">
                    No user Found
                </p> */}
            </div>
        </div>
    );
}

export default SeachModel;