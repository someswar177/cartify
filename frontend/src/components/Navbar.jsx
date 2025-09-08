import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ isDark, onToggleTheme, onCartClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-md border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`flex items-center space-x-2 font-bold text-xl transition-colors duration-200 ${
              isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            <div className="w-20 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-md">Cartify</span>
            </div>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center max-w-md w-full mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className={`w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`md:hidden transition-colors duration-200 ${
                isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {user && (
              <button
                onClick={onCartClick}
                className={`relative p-2 transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 001 1h10a1 1 0 001-1v-6m-9 6h.01M16 19h.01"
                  />
                </svg>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <span className={`hidden sm:block text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Hi, {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 text-sm transition-colors duration-200 ${
                    isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className={`md:hidden py-3 border-t animate-slide-in-left ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className={`w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;