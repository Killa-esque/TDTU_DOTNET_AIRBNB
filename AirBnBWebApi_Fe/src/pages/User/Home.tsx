import Carousel from '@/components/User/Layout/Carousel/Carousel'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <div className="h-28"></div>
      <Carousel />
      {/* <div className='container mx-auto mt-10'>
        <Room />
      </div> */}
    </div>
  )
}

export default Home
