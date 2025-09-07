import { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_CART_ITEMS':
      return { ...state, items: action.payload, loading: false }
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const initialState = {
  items: [],
  loading: false
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { isAuthenticated } = useAuth()

  // Load cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart()
    } else {
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [isAuthenticated])

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.get('/cart')
      dispatch({ type: 'SET_CART_ITEMS', payload: response.data.items })
    } catch (error) {
      console.error('Failed to load cart:', error)
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      dispatch({ type: 'ADD_ITEM', payload: product })
      await api.post('/cart/add', { productId: product.id, quantity: 1 })
      toast.success('Item added to cart!')
    } catch (error) {
      console.error('Failed to add item to cart:', error)
      toast.error('Failed to add item to cart')
      // Revert optimistic update
      loadCart()
    }
  }

  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: productId })
      await api.delete(`/cart/remove/${productId}`)
      toast.success('Item removed from cart')
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      toast.error('Failed to remove item from cart')
      // Revert optimistic update
      loadCart()
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
      await api.put('/cart/update', { productId, quantity })
    } catch (error) {
      console.error('Failed to update quantity:', error)
      toast.error('Failed to update quantity')
      // Revert optimistic update
      loadCart()
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: 'CLEAR_CART' })
      await api.delete('/cart/clear')
      toast.success('Cart cleared')
    } catch (error) {
      console.error('Failed to clear cart:', error)
      toast.error('Failed to clear cart')
    }
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}