import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fakeStoreApi } from '../utils/api'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { ProductDetailSkeleton } from '../components/Skeleton'

const ProductDetail = ({ isDark }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fakeStoreApi.get(`/products/${id}`).then(res => res.data),
    enabled: !!id
  })

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      await addToCart(product)
    } catch (err) {
      console.error(err)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z" />
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    return stars
  }

  if (isLoading) {
    return <ProductDetailSkeleton isDark={isDark} />
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Product not found
          </h2>
          <p className={`mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center transition-colors duration-200 ${
              isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </nav>

        <div className={`rounded-xl shadow-lg overflow-hidden animate-fade-in ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-white rounded-lg p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className={`text-sm uppercase tracking-wide font-medium mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {product.category}
                </p>
                <h1 className={`text-3xl font-bold leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.title}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {product.rating?.rate.toFixed(1)} ({product.rating?.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className={`text-4xl font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Description
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
              </div>

              {/* Product Features */}
              <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className={`flex items-center space-x-3 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail