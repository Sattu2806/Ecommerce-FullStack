import React, {useState, useEffect} from 'react'
import {CldUploadWidget} from "next-cloudinary"

type Props = {
    info:any
    updateInfo: React.Dispatch<React.SetStateAction<any>>
    imageUrls: string[]
    setImageUrls:React.Dispatch<React.SetStateAction<string[]>>
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUpload:React.FC<Props>  = ({info,updateInfo,imageUrls,setImageUrls,handleImageChange}) => {
    const onupload = (result:any) => {
        updateInfo(result.info.secure_url)
        const newImageUrl = result.info.secure_url
        setImageUrls(preImageUrls => [...preImageUrls, newImageUrl])
        handleImageChange(result)
    }

    const handleDeleteImage = (index:number)=>{
        setImageUrls(prevImageUrls => {
            const updateImageUrls = [...prevImageUrls]
            updateImageUrls.splice(index,1)
            return updateImageUrls
        })
    }
  return (
    <div>
        <div className='mb-10'>
            <CldUploadWidget uploadPreset='kfmp7mhq' onUpload={onupload}>
                {({open}:any) => {
                    function handleOnclick(e: React.MouseEvent<HTMLButtonElement>){
                        e.preventDefault()
                        open()
                    }
                    return(
                        <button className='border-[1px] rounded-lg p-1 px-2' onClick={handleOnclick}>
                            Upload Product Images
                        </button>
                    )
                }}
            </CldUploadWidget>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {imageUrls.map((imageUrl, index) =>(
                <div key={index} className='flex flex-col justify-center'>
                    <img src={imageUrl} className='w-[250px] h-[300px] object-cover object-top' alt={`uploades Image ${index + 1}`} />
                    <button className='border-[1px] rounded-lg p-1 px-2 mt-5' onClick={() => handleDeleteImage(index)}>delete</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageUpload