import { createContext, useContext, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, loading: false }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  
  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      // Call backend endpoint to check if user is authenticated via HTTP-only cookie
      const response = await api.get('/auth/me')
      dispatch({ type: 'SET_USER', payload: response.data.user })
    } catch (error) {
      // If no valid session, user is not authenticated
      dispatch({ type: 'SET_USER', payload: null })
    }
  }

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      // Backend should set HTTP-only cookie and return user data
      const response = await api.post('/auth/login', { email, password })
      dispatch({ type: 'SET_USER', payload: response.data.user })
      toast.success('Login successful!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      toast.error(message)
      return false
    }
  }

  const signup = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.post('/auth/signup', { name, email, password })
      dispatch({ type: 'SET_USER', payload: response.data.user })
      toast.success('Account created successfully!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      toast.error(message)
      return false
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
      dispatch({ type: 'LOGOUT' })
      toast.success('Logged out successfully')
    } catch (error) {
      // Even if logout fails, clear local state
      dispatch({ type: 'LOGOUT' })
      toast.error('Logout failed')
    }
  }

  const value = {
    ...state,
    login,
    signup,
    logout,
    checkAuthStatus
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}