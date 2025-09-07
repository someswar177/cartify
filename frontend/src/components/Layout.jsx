import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import { useState } from 'react'

const Layout = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar onCartClick={() => setIsCartDrawerOpen(true)} />
      
      <main className="pt-16">
        <Outlet />
      </main>

      <CartDrawer 
        isOpen={isCartDrawerOpen} 
        onClose={() => setIsCartDrawerOpen(false)} 
      />
    </div>
  )
}

export default Layout