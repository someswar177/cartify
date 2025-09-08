import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage' // <-- your cart page component
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
      <Routes>
        {/* All main pages inside Layout */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth routes outside Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}