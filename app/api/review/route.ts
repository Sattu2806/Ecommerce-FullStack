import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const body = await request.json()
    const {
        star,
        comment,
        productId,
        userId
    } = body

    try{
        const review = await prisma.review.create({
            data:{
                rating:star,
                commentry:comment,
                productId:productId,
                userId:userId
            }
        })
        return NextResponse.json(review)
    }catch(error){
        console.log("Error creating review",error)
        return NextResponse.error()
    }
}