import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fakeStoreApi } from '../utils/api'

const FilterSidebar = ({ 
  isDark,
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters)
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fakeStoreApi.get('/products/categories').then(res => res.data)
  })

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (min, max) => {
    const newFilters = { 
      ...localFilters, 
      priceRange: { min: Number(min), max: Number(max) }
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: { min: 0, max: 1000 },
      sortBy: 'default'
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Filters
        </h3>
        {isMobile && (
          <button
            onClick={onClose}
            className={`transition-colors duration-200 ${
              isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className={`text-sm hover:underline ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        Clear all filters
      </button>

      {/* Categories */}
      <div>
        <h4 className={`font-medium mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Category</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={localFilters.category === ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className={`ml-2 text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>All</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={localFilters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className={`ml-2 text-sm capitalize ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className={`font-medium mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Price Range</h4>
        <div className="space-y-3">
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={localFilters.priceRange.min}
              onChange={(e) => handlePriceChange(e.target.value, localFilters.priceRange.max)}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Min: ${localFilters.priceRange.min}</span>
              <span>Max: ${localFilters.priceRange.max}</span>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={localFilters.priceRange.max}
              onChange={(e) => handlePriceChange(localFilters.priceRange.min, e.target.value)}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className={`font-medium mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-gray-900'
          }`}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  )

  if (isMobile) {
    if (!isOpen) return null
    
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={onClose}
        />
        
        {/* Mobile drawer */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-300 animate-slide-in-left overflow-y-auto ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-4">
            {sidebarContent}
          </div>
        </div>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className={`w-64 rounded-lg shadow-md p-6 h-fit sticky top-20 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {sidebarContent}
    </div>
  )
}

export default FilterSidebar