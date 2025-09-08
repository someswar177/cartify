import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const CartPage = ({ isDark }) => {
  const {
    items,
    loading,
    incrementItem,
    decrementItem,
    removeFromCart,
    getCartTotal,
    clearCart
  } = useCart()

  if (loading) {
    return (
      <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className={`h-8 rounded w-1/4 mb-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`rounded-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-20 h-20 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                      }`}></div>
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 rounded w-3/4 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                        }`}></div>
                      <div className={`h-3 rounded w-1/2 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                        }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="text-center animate-fade-in">
          <div className="text-gray-400 mb-6">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 001 1h10a1 1 0 001-1v-6m-9 6h.01M16 19h.01" />
            </svg>
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>
            Your cart is empty
          </h2>
          <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              Shopping Cart ({items.length} items)
            </h1>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.title}`}
                  className={`rounded-xl shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 ${isDark
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                    }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-white rounded-lg p-2 border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className={`text-lg font-semibold transition-colors duration-200 ${isDark
                            ? 'text-white hover:text-blue-400'
                            : 'text-gray-900 hover:text-blue-600'
                          }`}
                      >
                        {item.title}
                      </Link>
                      <p className={`text-sm capitalize mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {item.category}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                          ${item.price.toFixed(2)}
                        </span>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${isDark
                                ? 'bg-gray-600 hover:bg-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>

                          <span className={`text-lg font-semibold w-12 text-center ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => incrementItem(item.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${isDark
                                ? 'bg-gray-600 hover:bg-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          Subtotal: <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className={`rounded-xl shadow-md p-6 border sticky top-24 ${isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
                }`}>
                <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>

                  <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>

                  <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>

                  <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />

                  <div className={`flex justify-between text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className={`block text-center mt-4 hover:underline transition-colors duration-200 ${isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}
                >
                  Continue Shopping
                </Link>

                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                  <div className={`flex items-center justify-center space-x-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage