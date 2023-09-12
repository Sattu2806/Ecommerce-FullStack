import type { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/app/prismadb"
import bcrypt from "bcrypt"

export const options:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'text',
                    placeholder:'your email'
                },
                password:{
                    label:'password',
                    type:'password',
                    placeholder:'your password'
                }
            },
            async authorize(credentials){
                
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
                }
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })

                if(!user || !user?.password){
                    throw new Error('Invalid credentials')
                }

                const isCorrectedPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if(!isCorrectedPassword){
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ],
    pages:{
        signIn:'/signin',
        error:'/signin'
    },
    callbacks:{
        session: async ({session, token, user}) => {
            if(session?.user){
                session.user.id = token.uid;
            }
            return session
        },
        jwt: async ({user, token}) => {
            if(user){
                token.uid = user.id
            }
            return token
        }
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug:process.env.NODE_ENV === 'development'
}