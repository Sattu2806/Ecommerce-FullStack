'use client'
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {CiShoppingCart,CiCreditCard1} from "react-icons/ci"

type Props = {
    productId?:number
}

const AddCart = ({productId}: Props) => {
    const {data:session} = useSession()
    const id = session?.user.id
    const router = useRouter()

    const handleCart =  async() => {
        if(session?.user){
        try{
            const response = await axios.post('/api/cart',{
                productId:productId,
                userId:id
            })
            .then((response)=> {
                router.push('/cart')
                console.log(response.data)
            })
        }catch(error){
            console.log(error)
        }
    }else{
        router.push('/signin')
    }
    }
        return(
            <div onClick={handleCart} className='flex items-center space-x-4 bg-purple-600 text-white px-6 p-2 rounded-full cursor-pointer'>
                <span>
                    <CiShoppingCart size={24} />
                </span>
                <span className='text-wm'>Add to Cart</span>
            </div>
        )
}

export default AddCart