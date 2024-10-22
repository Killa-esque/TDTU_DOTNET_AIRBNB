import Footer from '@/components/User/Layout/Footer/Footer'
import Header from '@/components/User/Layout/Header/Header'
import SearchModal from '@/components/User/Modal/SearchModal'
import { Outlet } from 'react-router-dom'

type Props = {}

export function UserTemplate({ }: Props) {
  return (
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

      <SearchModal />
    </div>
  )
}
