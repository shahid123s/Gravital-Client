import React from "react";
import { useChat } from "../../contextApi/chatContext";

const UserListModal = ({ isOpen, onClose, users, title = "Users" }) => {
    const {createMessage} = useChat();
    if (!isOpen) return null; // If modal is closed, return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg w-[29%] p-4 min-h-[20%]">
                {/* Modal Header */}
                <div className="flex justify-end items-center pb-2">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✖
                    </button>
                </div>

                {/* Modal Body */}
                <div className="mt-2 max-h-60 overflow-auto scrollbar-hide shadow-xl flex flex-col gap-2 ">
                    {users.length === 0 ? (
                        <p className="text-gray-400 text-center">No users found</p>
                    ) : (
                        users.map((user) => (
                            <div key={user._id} className="flex items-center gap-5 p-2  h-16 ">
                                <img
                                    src={user.profileImage || "/default-avatar.png"}
                                    alt={user.following.fullName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-white">{user.following.fullName}</span>
                                <button className='ml-auto bg-[#4A90E2] rounded-md p-2 text-white text-[12px] ' onClick={() => createMessage(user.following._id)} >Message</button>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserListModal;