// client/src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast';

const Login = ({ isDark }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email: formData.email, password: formData.password });
    if (success) {
      toast.success("Logged in!");
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="w-22 h-22 bg-gradient-to-r from-blue-500 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">Cartify</span>
          </div>
          <h2 className={`text-3xl font-extrabold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Or{' '}
            <Link to="/signup" className={`font-medium hover:underline ${
              isDark ? 'text-blue-400' : 'text-blue-600 hover:text-blue-500'
            }`}>
              create a new account
            </Link>
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>Email address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>Password</label>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                    isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login