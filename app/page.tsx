import Image from 'next/image'
import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import Container from './components/container/Container'

export default async function Home() {
  const user = await getCurrentUser()
  // console.log(user)
  return (
    <div className='px-5 max-w-[1280px] mx-auto'>
      <Navbar/>
      <hr />
      <Container/>
    </div>
  )
}
