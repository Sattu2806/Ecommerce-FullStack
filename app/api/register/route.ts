import prisma from "@/app/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    const body = await request.json()
    const {
        name,
        email,
        password
    } = body

    const hashedPassword = await bcrypt.hash(password,12)

    try{
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        return NextResponse.json(user)
    }catch{
        return NextResponse.error()
    }
}