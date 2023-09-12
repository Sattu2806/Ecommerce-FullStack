import Stripe from "stripe";
import prisma from "@/app/prismadb"
import { NextResponse } from "next/server";
import {headers} from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion:'2023-08-16', typescript:true})

export async function POST (req:Request){
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(body,signature,process.env.WEBHOOK_SIGNIN_SECRET!)
    }catch(error:any){
        return new NextResponse(`WebHook Error : ${error.message}`, {status:400})
    }
    
    const session = event.data.object as Stripe.Checkout.Session

    if(event.type === 'checkout.session.completed'){
        const paymentIntentSucceded = event.data.object

        const purchasedId = session?.metadata?.productIds
        const userId = parseInt(session?.metadata?.userId as string)

        if(purchasedId){
            const jsonArray = JSON.parse(purchasedId)
            
            if(Array.isArray(jsonArray)){
                for(const productId of jsonArray){
                    await prisma.purchased.create({
                        data:{
                            isPaid:true,
                            productId:productId,
                            userId:userId
                        }
                    })
                    const cartItemDelete = {
                        userId:userId,
                        productId:productId
                    }

                    await prisma.cart.deleteMany({
                        where:cartItemDelete
                    })
                }
            }
        }
    }

    return new NextResponse(null, {status:200})
}