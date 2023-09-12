'use client'
import React, {useState} from 'react'
import ReactStars from "react-rating-star-with-type"
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props = {
    productId?:number
    userId?:number
}

const Review = ({productId,userId}: Props) => {
    const router = useRouter()
    const defaultReviwForm = {
        star:0,
        comment:'',
        productId:productId,
        userId:userId
    }

    const [reviewForm, setReviewForm] = useState(defaultReviwForm)

    const onChange = (nextValue:any) => {
        setReviewForm(prevState => ({...prevState,star:nextValue}))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setReviewForm(prevState => ({...prevState,[name]:value}))
    }

    const postData = async () => {
        try{
            const response = await axios.post('/api/review',reviewForm)
            setReviewForm(defaultReviwForm)
            console.log(response.data)
            router.refresh()
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <h1 className='text-xl font-medium mb-4'>Give your opinions</h1>
        <h2 className='mb-2'>Give Rating</h2>
        <ReactStars
         onChange={onChange}
         value={defaultReviwForm.star}
         size={17}
         isEdit={true}
         activeColors={['red','orange',"#FFCE00","#9177FF","#8568FC",]}
         />
         <h2 className='mt-4'>Write you comment here;</h2>
         <div>
            <input className='border-[1px] border-purple-300 rounded-lg w-full h-[40px] focus:border-purple-500 outline-none px-2 mt-2'
            name='comment'
            onChange={handleChange}
            value={reviewForm.comment}
             type="text" />
         </div>
         <button className='px-5 p-2 border-[1px] bg-purple-600 text-white rounded-lg mt-5' onClick={postData}>Submit</button>
    </div>
  )
}

export default Review