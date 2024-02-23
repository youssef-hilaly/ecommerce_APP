import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavbarUI from '../NavbarUI/NavbarUI'

export default function Layout() {
  return (
    <>
      <NavbarUI />
      <Outlet />
      <Footer />
    </>
  )
}
