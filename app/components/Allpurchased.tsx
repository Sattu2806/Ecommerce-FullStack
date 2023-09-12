import React from 'react'
import prisma from "@/app/prismadb"
import Link from 'next/link'
import {BsCheck2All} from "react-icons/bs"

type Props = {
    userId?: number
}

const Allpurchased = async ({userId}: Props) => {
    const purchasedproduct = await prisma.purchased.findMany({
        where:{
            userId:userId
        }
    })
    const cartProdcutPromises = purchasedproduct.map((purchaseProduct) => prisma.product.findUnique({
        where:{
            id:purchaseProduct.productId
        }
    }))

    const purchaseProducts = await Promise.all(cartProdcutPromises)

    if(purchaseProducts.length === 0){
        return(
            <div className='relative flex items-center justify-center'>
                <img src="empty.png" alt="" />
                <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
            </div>
        )
    }
  return (
    <div className='mt-14'>
        {purchaseProducts.map((cartProduct) => (
            <div key={cartProduct?.id} className='flex items-center justify-between w-8/12 mx-auto shadow-lg p-5 rounded-lg mt-6'>
                <div>
                    <h1 className='text-2xl mb-3'>{cartProduct?.title}</h1>
                    <h2 className='mb-2 text-neutral-800'>Price: {cartProduct?.price}</h2>
                    <h3 className='text-sm text-neutral-600 mb-2'>Category: {cartProduct?.category}</h3>
                    <h3 className='text-sm text-neutral-600 mb-2'>Style: {cartProduct?.style}</h3>
                    <h3 className='text-sm text-neutral-600 mb-2'>Store: {cartProduct?.store}</h3>
                    <p className='text-green-600'>Purchased <BsCheck2All size={20} className='text-green-600'/></p>
                </div>
                <Link href={`/dashboard/${cartProduct?.id}`}>
                    <div>
                        <img src={cartProduct?.images.split(',')[0]} className='w-[200px] h-[200px] object-cover object-top' alt="" />
                    </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Allpurchased