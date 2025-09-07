import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fakeStoreApi } from '../utils/api'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import { ProductGridSkeleton } from '../components/Skeleton'
import { useDebounce } from '../hooks/useDebounce'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: { min: 0, max: 1000 },
    sortBy: 'default'
  })
  
  const searchTerm = searchParams.get('search') || ''
  const debouncedSearch = useDebounce(searchTerm, 300)

  // Fetch products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', filters.category],
    queryFn: () => {
      const endpoint = filters.category 
        ? `/products/category/${filters.category}`
        : '/products'
      return fakeStoreApi.get(endpoint).then(res => res.data)
    }
  })

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products.length) return []

    let filtered = [...products]

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    )

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }, [products, debouncedSearch, filters])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    
    // Update URL params
    const params = new URLSearchParams(searchParams)
    if (newFilters.category) {
      params.set('category', newFilters.category)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Failed to load products. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>
            
            {/* Mobile filter button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <FilterSidebar
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isMobile={true}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M7 7h10v6H7V7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home