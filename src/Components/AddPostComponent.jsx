import React, { useState, useRef, useEffect } from 'react'
import MediaButton from '../assets/media.svg';
import SheduleButton from '../assets/schedule.svg';
import PollButton from '../assets/poll.svg'
import SubmitLogo from '../assets/right-arrow-submit.svg'
import CloseLogo from '../assets/cross-button.svg'
import ImageCropModal from './User/settingsComponent/ImageCropModal';
import { AspectRatio } from '../constants/imageDimentions';
import { toast } from 'sonner';
import { axiosInstance } from '../utilities/axios';
import Spinner from './Spinner';

function AddPostComponent({profileImage}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [isCrop, setIsCrop] = useState(false)
  const [croppedImage, setCroppedImage] = useState({})
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);
  const mediaRef = useRef(null);



  // console.log(profileImage)

  


  const handleInputChange = (e) => {
    setCaption(e.target.value);


    // Adjust height to fit content
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    mediaRef.current.click();
  }

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels); // Update cropped area
  }

  const handleImageLoad = () => {

  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImage(URL.createObjectURL(file));
      setIsCrop(true)
      console.log(typeof (URL.createObjectURL(file)))
    }
  };

  // const handleUpload = async () => {
  //   if (image && croppedAreaPixels) {
  //     const croppedImage = await getCroppedImg(image, croppedAreaPixels); // Call the utility to get the cropped image
  //     console.log(croppedImage); // This is the base64 data or blob, depending on your implementation of getCroppedImg
  //     // You can then send this croppedImage to your backend
  //   }
  //   console.log(image)

  // }


  const handleClose = () => {
    setCroppedImage('');
    setImage(null)
    mediaRef.current.value = ''

  }


  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    
    console.log(croppedImage, caption)
   try {
    const blob  = croppedImage.postBlob;

    const formData = new FormData();
    if(!blob){
      toast.error('Image is Not Selected ');
    }
    formData.append('post', blob);
    formData.append('caption', caption);

    console.log(formData)
    const resposne = await axiosInstance.post('/post/add-post', formData, {
      headers : {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 300000,
    })
    if(resposne){
      console.log(resposne);
      toast.success(resposne.data.message)
      setLoading(false)
      setImage('');
      setCroppedImage('');
      mediaRef.current.value = '';
      setCaption('')
    }

    
   } catch (error) {
    toast.error(error)
   }
  }


  return (
    <div className='bg-[#F9F9F9] rounded-lg w-[99%] flex  flex-col justify-evenly items-center  gap-10 p-5 '>
      <div className='flex w-full gap-2 '>
        <div className='  w-14  flex items-center overflow-hidden rounded-full  '>
          <img src={profileImage} alt="" />
        </div>
        <div className='flex-1 flex flex-col gap-8 '>
          <textarea
            ref={textAreaRef}
            value={caption}
            onChange={handleInputChange}
            rows="1"
            placeholder="Type here..."
            className=" w-full p-3 bg-[#33333333] rounded-2xl resize-none overflow-hidden disabled:"
            style={{
              minHeight: '50px',
              maxHeight: '200px',
            }}
          />


        </div>
      </div >
      {croppedImage.post && !isCrop && (
  <div className={`flex flex-col items-end gap-5 ${loading ? 'opacity-50' : ''}`}>
  
    <div className="relative w-full h-[70vh]">
      
      <img src={croppedImage.post} alt="" className="h-full w-full rounded-xl" />


      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner position={'absolute'} />
        </div>
      )}


      <button className="absolute top-2 right-2" onClick={handleClose}>
        <img src={CloseLogo} alt="Close" className="w-8" />
      </button>
    </div>
  </div>
)}
      <div className='flex w-full justify-evenly  items-start '>
        <input
          type="file"
          ref={mediaRef} 
          className='hidden' 
          onChange={handleFileChange} 
        />

        <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins' onClick={handleClick}><img src={MediaButton} alt="" /> Media</button>
        <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins'><img src={PollButton} alt="" /> Poll</button>
        <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins'><img src={SheduleButton} alt="" /> Shedule</button>
        {croppedImage.post && !isCrop &&<button className='w-7 flex items-center gap-2 text-[#4A90E2] font-poppins disabled:cursor-not-allowed ' onClick={handleSubmit} disabled={loading}>Post<img src={SubmitLogo} alt="" /></button>}

      </div>

      {isCrop && <ImageCropModal imageSrc={image} ASPECT_RATIO={AspectRatio.SQUARE} setData={setCroppedImage} setImageCrop={setIsCrop} />}

    </div>
  )
}

export default AddPostComponent
