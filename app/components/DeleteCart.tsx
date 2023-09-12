'use client'
import React from 'react'
import axios from 'axios'
import {GoTrash} from "react-icons/go"
import { useRouter } from 'next/navigation'

type Props = {
    productId?:number
    userId?:number
}

const DeleteCart = (props: Props) => {
    const router = useRouter()
    const handleDelete = async () => {
        try{
            await axios.delete('/api/cart',{
                data:{
                    productId:props.productId,
                    userId:props.userId
                }
            })
            router.refresh()
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='cursor-pointer' onClick={handleDelete}>
        <GoTrash className='text-red-500' size={20}/>
    </div>
  )
}

export default DeleteCart