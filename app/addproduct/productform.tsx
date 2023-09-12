'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { signIn, signOut,useSession } from 'next-auth/react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'

type Props = {}

const Productform = (props: Props) => {
    const {data:session} = useSession()
    const id = session?.user.id
    const router = useRouter()
    const [formData,setFormData] = useState({
        title:'',
        description:`<div>
        <p>
        Enter your text here ....
        </p>
      </div>`,
        category:'',
        style:'', 
        size:'',
        inventory:0,
        color:'#fe345e',
        price:0,
        images:'',
        userId:id,
        store:''
    })

    const [Description, setDescription] = useState<string>('')
    const [info, updateinfo] = useState<any>()
    const [imageUrls, setImageUrls] =useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "price" ? parseInt(e.target.value):parseInt(e.target.value)
        const inventory = e.target.name === "inventory" ? parseInt(e.target.value):parseInt(e.target.value)
        setFormData({
            ...formData,
            [e.target.name] : value,
            [e.target.name] : inventory,
        })
    }

    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        setFormData({
            ...formData,
            images:stringimages,
            description:Description,
            userId:id
        })
    }

    useEffect(() => {
        console.log(formData.images)
        console.log(formData)
    }, [formData])

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            description:Description,
            images:imageUrls.toString(),
            userId:id
        }))
    }, [imageUrls])

    const postData = async () => {
        handleImageChange()
        try{
            const response = await axios.post('/api/addproduct', formData)
            router.push('/')
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='px-5 max-w-[1280px] mx-auto mb-10'>
        <div>
            <Navbar/>
        </div>
        <h1 className='text-3xl font-semibold py-6'>Add your Product n SEINE</h1>
        <div className='text-black mt-4'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <div>
                    <label htmlFor="title" className='font-medium'>Title</label>
                    <input 
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label htmlFor="category" className='font-medium'>Category</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="style" className='font-medium'>Style</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='style'
                        value={formData.style}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="store" className='font-medium'>Store</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='store'
                        value={formData.store}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="size" className='font-medium'>Size</label>
                    <input 
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='size'
                        value={formData.size}
                        onChange={handleChange}
                        />
                    <Size setFormData={setFormData}/>
                </div>
                <div>
                    <label htmlFor="inventory" className='font-medium'>Inventory</label>
                    <input 
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='inventory'
                        value={formData.inventory}
                        onChange={handlePriceChange}
                        />
                </div>
                <div>
                    <label htmlFor="price" className='font-medium'>Price</label>
                    <input 
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='price'
                        value={formData.price}
                        onChange={handlePriceChange}
                        />
                </div>
                <div>
                    <div>
                        <label htmlFor="color" className='font-medium'>Color</label>
                        <input 
                            type="text"
                            className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                            name='color'
                            value={formData.color}
                            onChange={handleChange}
                            />
                    </div>
                    <Color setFormData={setFormData} Color={formData.color}/>
                </div>
            </div>
            <label htmlFor="" className='mt-10 inline-block font-medium'>Description about your product</label>
            <Para setDescription={setDescription} description={formData.description} />
            <label htmlFor="" className='mt-10 inline-block font-medium'>Upload Images</label>
            <ImageUpload info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange}/>
            <button onClick={postData} className='text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2'>Submit</button>
        </div>
    </div>
  )
}

export default Productform