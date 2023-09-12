import NextAuth from "next-auth/next";
declare module 'next-auth'{
    interface User {
        id: number
    }
}

declare module 'next-auth'{
    interface Session{
        user:{
            id:string
        } & DefaultSession['user']
    }
}