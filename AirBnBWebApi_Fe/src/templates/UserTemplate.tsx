import Footer from '@/components/User/Layout/Footer/Footer'
import Header from '@/components/User/Layout/Header/Header'
import AuthModal from '@/components/User/Modal/AuthModal'
import SearchModal from '@/components/User/Modal/SearchModal'
import { ModalProvider } from '@/contexts/ModalAuthContext'
import { Outlet } from 'react-router-dom'

type Props = {}

export function UserTemplate({ }: Props) {
  return (
    <ModalProvider>
      <div className="user-layout">
        <header>
          <Header />
        </header>

        <main>
          <section className="user-content">
            <Outlet />
          </section>
        </main>

        {/* Footer Section */}
        <footer>
          <Footer />
        </footer>

        <AuthModal />

        <SearchModal />
      </div>
    </ModalProvider>
  )
}
