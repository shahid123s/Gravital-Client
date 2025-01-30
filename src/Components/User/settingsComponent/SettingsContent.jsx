import React, { useEffect, useRef, useState } from 'react'
import UserLogo from '../../../assets/images.png'
import { ChevronDown, Turtle, User, } from 'lucide-react'
import { toast } from 'sonner';
import { axiosInstance } from '../../../utilities/axios';
import ImageCropModal from './ImageCropModal';
import useFetchUserData from '../../../hooks/fetchUserDetail';
import Spinner from '../../Spinner';
import { Dimentions, AspectRatio } from '../../../constants/imageDimentions';

function SettingsContent() {
    const { userDetails, refetch, setUserDetails } = useFetchUserData()
    const [genderDropDown, setGenderDropDown] = useState(false);
    const [imageCrop, setImageCrop] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [isChanged, setIsChanged] = useState(false);
    const profileImageRef = useRef(null)

    useEffect(() => {
        if (!imageCrop) {
            setImageUrl('')
        }
    }, [imageCrop])


    const handleDropDown = (event) => {
        event.preventDefault();
        setGenderDropDown(!genderDropDown)
    }

    const handleChange = (event) => {
        setIsChanged(true);
        console.log(event.target.files)
        const file = event.target?.files ? event.target.files[0] : null;
        const value = event.target.value;


        if (file) {
            const img = new Image();
            const imgUrl = URL.createObjectURL(file);

            img.onload = () => {
                if (img.naturalWidth < Dimentions.MIN_WIDTH || img.naturalHeight < Dimentions.MIN_WIDTH) {
                    toast.error('Image should be at least 150px in width and height.');
                    setImageCrop(false);
                    URL.revokeObjectURL(imgUrl);
                    return
                }

                setImageUrl(imgUrl);
                setImageCrop(true);
                console.log('Opening crop modal');
            };

            img.src = imgUrl;
        }
        event.target.value = '';

        if (event.target.type === 'textarea' || event.target.name === 'bio') {
            setUserDetails({ ...userDetails, bio: value });
        }
    }

    const handleGender = (gender) => {
        setIsChanged(true)
        if (gender === 'male') {
            setUserDetails({ ...userDetails, gender: 'Male' })
            console.log('vanna')
        }
        else {
            setUserDetails({ ...userDetails, gender: 'Female' })
        }


        setGenderDropDown(false)
    }

    const handleClick = (event) => {
        event.preventDefault();
        profileImageRef.current.click()
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        console.log(userDetails);

        const blob = userDetails.profileImageBlob;



        const formData = new FormData();

        if (blob) {
            formData.append('profileImage', blob);
        }

        formData.append('bio', userDetails.bio);
        formData.append('gender', userDetails.gender);



        try {
            const resposne = await axiosInstance.post('/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (resposne) {
                setLoading(false)
                toast.success('updated Successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className='bg-[#121212] w-full ml-[608px] flex-col flex p-5 gap-14 '>

            {loading && <Spinner />}

            {!loading && userDetails && <>
                <div className='bg-inherit'>
                    <h1 className='text-2xl font-poppins text-white font-normal'>Edit Profile</h1>
                    <div className=' bg-white/10  backdrop-blur-md border border-white/20  resize-none overflow-hidden text-white placeholder-gray-300 rounded-xl mx-10 p-3 my-5 flex justify-between items-center'>
                        <div className='bg-transparent flex items-center  gap-5'>
                            <div className='bg-transparent'>
                                <img src={userDetails.profileImage || UserLogo} alt="" className='w-[80px] h-[80px]  rounded-full ' />
                            </div>
                            <div className='bg-inherit flex flex-col'>
                                <h1 className='text-xl text-white font-poppins'>Shahid_1</h1>
                                <h1 className='text-white opacity-50 font-poppins'>Shahid Noushad</h1>
                            </div>
                        </div>
                        <input type="file" className='hidden' name="" id="" onChange={handleChange} ref={profileImageRef} />
                        <button className='font-poppins bg-[#4A90E2] p-4 text-white h-fit rounded-2xl' onClick={handleClick}>Change Profile</button>
                    </div>
                    {imageCrop && <ImageCropModal imageSrc={imageUrl} setImageCrop={setImageCrop} MIN_WIDTH={Dimentions.MIN_WIDTH} ASPECT_RATIO={AspectRatio.SQUARE} setData={setUserDetails} isRound={true} />}
                </div>

                <div className='bg-inherit'>
                    <h1 className='text-2xl font-poppins text-white font-normal'>Bio</h1>
                    <div className='rounded-xl mx-10 my-5 h-52 flex justify-between items-center'>
                        <textarea type="text" className='w-full  bg-white/10  backdrop-blur-md border border-white/20  resize-none overflow-hidden placeholder-gray-300  text-white  p-5 h-full  rounded-2xl border-[#757575] text-start' name='bio' value={userDetails.bio} onChange={handleChange} />
                    </div>
                </div>

                <div className='bg-inherit'>
                    <h1 className='text-2xl font-poppins text-white font-normal'>Gender</h1>
                    <div className='  bg-white/10  backdrop-blur-md border border-white/20  resize-none overflow-hidden placeholder-gray-300 rounded-xl mx-10 p-3 my-5 flex flex-col justify-between items-center' >
                        <div className='bg-transparent flex justify-between w-full' onClick={handleDropDown}>
                            <button className='w-full p-5 text-start rounded-2xl border-none text-white font-poppins ' >{userDetails.gender} </button>
                            <button><ChevronDown color='white' /></button>
                        </div>
                        {genderDropDown && <div className='bg-[#333333] rounded-xl p-3 flex flex-col gap-3 text-white  w-full justify-center'>
                            <h1 className='bg-[#333333] hover:cursor-pointer rounded-xl  p-1' onClick={() => handleGender('male')}>Male</h1>
                            <h1 className='bg-[#333333] hover:cursor-pointer  rounded-xl  p-1' onClick={() => handleGender('female')}>Female</h1>
                        </div>}
                    </div>
                </div>
                <button className={`font-poppins bg-[#333333] p-4 text-white h-fit w-fit ml-auto rounded-2xl ${isChanged ? 'opacity-100 cursor-pointer' : 'opacity-90 cursor-not-allowed'
                    }`} onClick={handleSubmit} disabled={!isChanged} >Save Changes</button>
            </>}
        </div>
    )
}

export default SettingsContent
