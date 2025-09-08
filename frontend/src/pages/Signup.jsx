// client/src/pages/Signup.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast';

const Signup = ({ isDark }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const success = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (success) {
      toast.success("Account created! Please sign in with your credentials.");
      navigate('/login');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-22 h-22 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">Cartify</span>
          </div>
          <h2 className={`text-3xl font-extrabold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Create your account</h2>
          <p className={`mt-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Or{' '}
            <Link to="/login" className={`font-medium hover:underline ${
              isDark ? 'text-blue-400' : 'text-blue-600 hover:text-blue-500'
            }`}>
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'
              } ${
                isDark
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'
              } ${
                isDark
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'
                } ${
                  isDark
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-white text-gray-900 placeholder-gray-500'
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'
              } ${
                isDark
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup