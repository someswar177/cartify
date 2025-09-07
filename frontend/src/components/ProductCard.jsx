import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }
    addToCart(product)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z" />
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    return stars
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-contain group-hover:opacity-90 transition-opacity duration-300 p-4"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
          {product.category}
        </p>

        <div className="flex items-center mt-2 space-x-1">
          {renderStars(product.rating?.rate || 0)}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            ({product.rating?.count || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard