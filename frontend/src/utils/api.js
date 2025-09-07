import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Include cookies in requests for HTTP-only cookie auth
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token if available (fallback for non-HTTP-only cookie auth)
api.interceptors.request.use(
  (config) => {
    // If you're using non-HTTP-only cookies, you can get token from localStorage here
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Separate instance for FakeStore API
export const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
})