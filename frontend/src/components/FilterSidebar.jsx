import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fakeStoreApi } from '../utils/api'

const FilterSidebar = ({ 
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
        {isMobile && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        Clear all filters
      </button>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Category</h4>
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
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">All</span>
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
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={localFilters.priceRange.min}
              onChange={(e) => handlePriceChange(e.target.value, localFilters.priceRange.max)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
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
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        
        {/* Mobile drawer */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 animate-slide-in-left overflow-y-auto">
          <div className="p-4">
            {sidebarContent}
          </div>
        </div>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit sticky top-20">
      {sidebarContent}
    </div>
  )
}

export default FilterSidebar