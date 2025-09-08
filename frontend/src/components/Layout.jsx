import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'

const Layout = ({ isDark, onToggleTheme }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  return (
    <>
      <Navbar 
        isDark={isDark} 
        onToggleTheme={onToggleTheme}
        onCartClick={() => setIsCartDrawerOpen(true)} 
      />
      
      <main className="pt-16">
        <Outlet />
      </main>

      <CartDrawer 
        isDark={isDark}
        isOpen={isCartDrawerOpen} 
        onClose={() => setIsCartDrawerOpen(false)} 
      />
    </>
  )
}

export default Layout