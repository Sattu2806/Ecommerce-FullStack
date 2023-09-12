import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const body = await request.json()
    const {productId, userId} = body

    try{
        const existingCartItem = await prisma.cart.findFirst({
            where:{
                productId,
                userId
            }
        })

        console.log(existingCartItem)
        if(existingCartItem){
            await prisma.cart.delete({
                where:{
                    id:existingCartItem.id
                }
            })
        }
        
        const product = await prisma.cart.create({
            data:{
                productId,
                userId
            }
        })

        return NextResponse.json(product)
    }catch(error){
        console.log("Error adding product to cart", error)
        return NextResponse.error()
    }
}

export async function DELETE(request:Request){
    const body = await request.json()
    const {productId, userId} = body

    try{
        const deleteCart = await prisma.cart.deleteMany({
            where:{
                productId,
                userId
            }
        })

        return NextResponse.json(deleteCart)
    }
    catch(error){
        console.log("Error deleting product", error)
        return NextResponse.error()
    }
}