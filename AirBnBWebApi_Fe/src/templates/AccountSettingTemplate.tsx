import { Outlet } from 'react-router-dom';

type Props = {}

const AccountSettingTemplate = (props: Props) => {
  return (
    <>
      <div className="h-28"></div>

      <div className='container mx-auto'>
        <Outlet />
      </div>
    </>
  )
}

export { AccountSettingTemplate };
