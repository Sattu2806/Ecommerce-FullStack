import React from 'react'
import prisma from "@/app/prismadb"
import Edit from '../Edit'

type Props = {}

const EditProduct = async ({params}:{params:{slug:string}}) => {
    const productId = parseInt(params.slug,10)

    if(isNaN(productId)){
        return <div>Invalid product ID</div>
    }

    try{
        const product = await prisma.product.findUnique({
            where:{
                id:productId
            }
        })

        if(!product){
            return <div>Product id not fount</div>
        }

        return(
            <div>
                <Edit {...product}/>
            </div>
        )
    }catch(error){
        console.log("Error", error);
        return <div>Error fetching product</div>
    }
}

export default EditProduct