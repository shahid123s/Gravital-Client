import React, { useState, useRef } from 'react'
import ReactCrop from 'react-image-crop';

function PostAddingModel({ imageSrc }) {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [zoom, setZoom] = useState(1);
    const imageRef = useRef(null)

    const handleImageLoad = () => {
        setIsOpen(false)
    }

    return (
        <div className='relative w-full flex justify-center mt- bg-gray-100 rounded-lg overflow-hidden'
        >
        
        </div>
    )
}

export default PostAddingModel
