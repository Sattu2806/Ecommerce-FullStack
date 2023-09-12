'use client'
import React from 'react'
import axios from 'axios'
import { GoTrash } from 'react-icons/go'
import { useRouter } from 'next/navigation'

type Props = {
    productId?:number
    userId?:number
}

const DeleteProduct = ({productId,userId}: Props) => {
    const router = useRouter()

    const handleDelete = async () => {
        try{
            await axios.delete('/api/addproduct',{
                data:{
                    productId:productId,
                    userId:userId
                }
            })
            router.refresh()
        }
        catch(error){
            console.log('Error in deleting product')
        }
    }
  return (
    <div onClick={handleDelete} className='cursor-pointer'>
        <GoTrash className='text-red-600' size={20}/>
    </div>
  )
}

export default DeleteProduct