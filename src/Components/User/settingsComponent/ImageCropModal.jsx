 import React, { useState, useEffect, useRef } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'sonner';
import setCanvasPreview from '../../../utilities/imageCrop';
import Spinner from '../../Spinner';



function ImageCropModal({ imageSrc, setImageCrop, MIN_WIDTH, ASPECT_RATIO, setData, isRound}) {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState({});     
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scrolling when modal closes
      document.body.style.overflow = '';
    };
  }, []);

  const key = isRound ? 'profileImage': 'post';
  const handleImageLoad = (event) => {
    const { width, height,} = event.currentTarget;
    const cropWidthInPercentage = (MIN_WIDTH / width) * 100;
   const newCrop = makeAspectCrop(
      {
        unit: '%',
        width:  cropWidthInPercentage || width, 
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centeredCrop = centerCrop(newCrop, width, height);
    setCrop(centeredCrop);
  };

  const handleClose =  () => {
    setImageCrop(false);
  }

  

  const handleAction = (action) => {
    switch(action){
        case 'cancel':
            setImageCrop(false);

            break;
        case 'submit':
            setCanvasPreview(
                 imageRef.current,
                 canvasRef.current,
                 convertToPixelCrop(
                  crop,
                  imageRef.current.width,
                  imageRef.current.height, 
                 )
            )
            const dataUrl = canvasRef.current.toBlob(blob => {
              if (!blob) {
                toast.error('Failed to create image blob');
                return;
              }
            
              // Create the preview URL
              const previewUrl = URL.createObjectURL(blob);
            
              // Pass the preview URL to the parent
              setData(prev => ({
                ...prev,
                [key]: previewUrl, // Passing preview URL to parent
                [`${key}Blob`]: blob,
              }));
            }, 'image/jpeg');



            handleClose();
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onDoubleClick={handleClose}
    >
      {/* {loading && <Spinner/> } */}

      <div className="flex flex-col items-center bg-transparent p-4 rounded-lg gap-5"
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <ReactCrop
          crop={crop}
          onChange={(_, newCrop) => setCrop(newCrop)}
          minWidth={MIN_WIDTH}
          circularCrop = {isRound}
          aspect={ASPECT_RATIO}
          className='bg-transparent custom-cropper '
        >
          <img
            src={imageSrc}
            ref={imageRef}
            alt="Profile Image"
            onLoad={handleImageLoad}
            style={{ display: 'block' }}
          />
        </ReactCrop>
        <div className='bg-transparent  flex gap-3 justify-center'>
        <button
         className='bg-[#333333] p-3 rounded-2xl text-white font-poppins'
         onClick={() => handleAction('cancel')}
        >
            Cancel 
        </button>
        <button
         className='bg-[#4A90E2] p-3 rounded-2xl text-white font-poppins'
         onClick={() => handleAction('submit')}
        >
            Save Changes
        </button>

        <canvas
            className='hidden'
            ref={canvasRef}
        />
        </div>
      </div>
    </div>
  );
}

export default ImageCropModal;