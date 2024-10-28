import Header from '@/components/Host/Layout/Header'
import Footer from '@/components/User/Layout/Footer/Footer'
import { ModalProvider } from '@/contexts/ModalAuthContext'
import { Outlet } from 'react-router-dom'

type Props = {}

export function HostTemplate({ }: Props) {
  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50">
          <Header />
        </header>
        <main className="flex-grow pt-16 px-4 lg:px-8 bg-gray-50">
          <Outlet />
        </main>
        <footer className="bg-white shadow-md">
          <Footer />
        </footer>
      </div>
    </ModalProvider>
  )
}
