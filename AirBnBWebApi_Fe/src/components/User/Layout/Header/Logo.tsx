import { history } from '@/main'
import { Image } from 'antd'
import airbnb_logo from "@/assets/images/airbnb_logo.png";


type Props = {}

const Logo = (props: Props) => {

  return (
    <div onClick={() => { history.push('/') }}>
      <Image
        alt='logo'
        className='block max-w-[75px] sm:max-w-[100px] md:max-w-[125px] lg:max-w-[150px] xl:max-w-[175px] h-auto object-contain cursor-pointer'
        src={airbnb_logo}
        preview={false}
      />
    </div>


  )
}

export default Logo
