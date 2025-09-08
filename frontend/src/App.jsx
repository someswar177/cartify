import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemDark)
    
    setIsDark(shouldBeDark)
    updateDocumentClass(shouldBeDark)
  }, [])

  const updateDocumentClass = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateDocumentClass(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen font-sans antialiased ${isDark ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Routes>
          <Route element={<Layout isDark={isDark} onToggleTheme={toggleTheme} />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home isDark={isDark} />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetail isDark={isDark} />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage isDark={isDark} />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login isDark={isDark} />} />
          <Route path="/signup" element={<Signup isDark={isDark} />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  )
}