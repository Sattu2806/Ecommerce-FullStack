'use client'
import React, {useState} from 'react'
import {AiOutlineHeart} from "react-icons/ai"

type Props = {
    imageUrls:string
}

const ImageGallery = ({imageUrls}: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const urlArray = imageUrls.split(',')
  return (
    <div className='images grid grid-cols-7'>
        <div className='all-images flex flex-col col-span-2 justify-center'>
            {urlArray.map((url,index) => (
                <div key={index} className='image relative rounded-lg'>
                    <img onClick={() => setSelectedImage(index)} className={`w-[70px] h-[70px] rounded-lg mb-3 p-1 object-cover object-top ${selectedImage === index ? "border-[1px] border-purple-500":"border-[1px] border-purple-200"}`} src={url} alt={`Image ${index + 1}`} />
                </div>
            ))}
        </div>
        <div className='selected-image col-span-5'>
            <img src={urlArray[selectedImage]} className='h-[600px] w-auto object-cover object-top' alt="" />
        </div>
    </div>
  )
}

export default ImageGallery