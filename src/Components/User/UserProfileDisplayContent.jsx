import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import MoreButton from '../../assets/threedot-black.svg'
import UserLogo from '../../assets/images.png'
import useFollow from '../../hooks/toggleFollow';
import OptionModal from './Report/OptionModal'
import OPTION_HEADER from '../../enum/optionHeader';
import ActionModal from '../Modals/ActionModal';
import ACTION_OPTIONS from '../../enum/actionOptions';
import { axiosInstance } from '../../utilities/axios';
import { toast } from 'sonner';
import { reportUser, toggleBlock, toggleRestriction } from '../../services/user/modarationServices';
import { getUserProfileUrl } from '../../utilities/copyUrl';


function UserDetailsDisplay({ userDetails, loading, username }) {
    const { toggleFollow, isFollowed } = useFollow(userDetails?.isFollowed)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionModal, setActionModal] = useState(null);
    const [actionContext, setActionContext] = useState(null);
    const [updatedOption, setUpdatedOption] = useState(OPTION_HEADER.USER)

    const fetchUserStatus = async () => {
        try {
            const response = await axiosInstance.get('/user/status', {
                params: {
                    userId: userDetails._id,
                },
            });
            const {isRestricted, isBlocked} = response.data;

            // Update the options dynamically
            const updatedOptions = OPTION_HEADER.USER.map((option) =>
                option.title === 'Restrict'
                    ? { ...option, title: isRestricted ? 'Unrestrict' : 'Restrict' }
                    : option.title === 'Block'
                    ? {...option, title: isBlocked? 'UnBlock': 'Block'} 
                    : option
            );

            setUpdatedOption(updatedOptions);
        } catch (error) {
            console.error('Error fetching restriction status:', error);
        }
    };



    const handleAction =  async (title, message) => {

        if(title === 'Restrict' || title === 'Unrestrict'){
           await toggleRestriction(userDetails._id);  
        }
        if(title === 'Report'){
           await reportUser(userDetails._id, message)
        }

        if(title === 'Block' || title === 'UnBlock'){
            await toggleBlock(userDetails._id);
        }
        toast.success(title);
        setActionModal(false);
        setActionContext(null);

    }

    const navigate = useNavigate()
    const handleEdith = async (event) => {
        if (username) {
            toggleFollow(userDetails._id)
        }
        else {
            navigate('/settings/edit-profile')
        }
    }

    const handleReport = async (event) => {
        event.preventDefault()
        await fetchUserStatus();
        setIsModalOpen(!isModalOpen)
    }

    const handleActionModal = async (title) => {
        setIsModalOpen(false);
        if (title === 'About this Account') {
            try {
                const response = await axiosInstance.get('/user/about-profile', {
                    params: { username: userDetails.username }
                })
                setActionContext(response.data.user)
                setActionModal(title);
            } catch (error) {
                toast.error(error.message)
            }
            return

        }

        if(title === 'Unrestrict' || title === 'UnBlock'){
            handleAction(title,)
            setIsModalOpen(false);
            return
        }

        if(title === 'Copy link'){
            const link = getUserProfileUrl(userDetails.username)
            await navigator.clipboard.writeText(link);
            toast.success('Link Copied')
            return;
        }

        setActionModal(title);
        setActionContext(ACTION_OPTIONS.USER[title])
    }

    const handleActionModalClose = () => {
        setActionModal(null);
        setActionContext(null);
        setIsModalOpen(false);
    }

    return (
        <div className='  flex flex-col  items-center w-full  bg-[#121212]  shadow-2xl shadow-gray-500 '>

            {userDetails.fullName && !loading && <div className=' w-full flex gap-9 justify-center items-center    p-6 px-20 bg-inherit'>
                <div className='w-52 overflow-hidden rounded-full h-52 flex justify-center items-center bg-zinc-600'>
                    {!loading && <img src={userDetails.profileImage || UserLogo} alt="" className='' />}
                </div>
                <div className='w-56 flex flex-1 flex-col text-white font-poppins gap-3 bg-inherit '>
                    <div className='flex bg-inherit gap-16'>
                        <h1 className='text-3xl '>{userDetails.fullName}</h1>
                        <button className='bg-[#4A90E2] rounded-lg p-2 ' onClick={handleEdith}>{!username ? 'Edit Profile' : isFollowed ? 'Unfollow' : 'Follow'}</button>
                        <button className='bg-[#4A90E2] rounded-lg p-2'>{!username ? 'View Activity' : 'Message'}</button>
                        {username && <button onClick={handleReport}><img src={MoreButton} alt="" /></button>}


                    </div>
                    {isModalOpen && <OptionModal
                        OPTION_HEADER={updatedOption}
                        setClose={handleReport}
                        handleOptionActions={handleActionModal}
                    />}
                    {actionModal && <ActionModal
                        title={actionModal}
                        actionContext={actionContext}
                        setClose={handleActionModalClose}
                        handleAction={handleAction}
                    />}
                    <div className='flex bg-inherit ml-6 gap-20'>
                        <h1 className='text-xl  '><span className='font-numberFont'>{userDetails.postCount}</span> Post </h1>
                        <h1 className='text-xl  '><span className='font-numberFont'>{userDetails.followersCount}</span> Followers </h1>
                        <h1 className='text-xl  '><span className='font-numberFont'>{userDetails.followingsCount}</span> Followings </h1>
                    </div>

                    <div className='flex bg-inherit ml-6 gap-20'>
                        <Link className='text-xl font-numberFont text-[#4A90E2]'>{userDetails.username}</Link>

                    </div>
                    <div className='flex bg-inherit ml-6 gap-10 flex-wrap'>
                        <p>{userDetails.bio}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UserDetailsDisplay;
