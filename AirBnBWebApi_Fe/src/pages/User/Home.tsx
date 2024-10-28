import Room from '@/components/User/Data/Room'
import Carousel from '@/components/User/Layout/Carousel/Carousel'


type Props = {}

const Home = (props: Props) => {

  return (
    <div>
      <div className="h-28"></div>
      {/* <Carousel /> */}
      <div className='container mx-auto'>
        <Carousel />
      </div>
      <div className='container mx-auto mt-10'>
        <Room />
      </div>
    </div>
  )
}

export default Home
