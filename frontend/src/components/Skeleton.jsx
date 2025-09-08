import React from 'react';

const Skeleton = ({ className = "", isDark, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded ${
        isDark ? 'bg-gray-600' : 'bg-gray-300'
      } ${className}`}
      {...props}
    />
  )
}

export const ProductCardSkeleton = ({ isDark }) => {
  return (
    <div className={`rounded-xl shadow-md overflow-hidden border ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <Skeleton isDark={isDark} className="h-64 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton isDark={isDark} className="h-4 w-3/4" />
        <Skeleton isDark={isDark} className="h-3 w-1/2" />
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} isDark={isDark} className="w-4 h-4" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Skeleton isDark={isDark} className="h-6 w-20" />
          <Skeleton isDark={isDark} className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export const ProductGridSkeleton = ({ isDark }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} isDark={isDark} />
      ))}
    </div>
  )
}

export const ProductDetailSkeleton = ({ isDark }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton isDark={isDark} className="aspect-square w-full rounded-lg" />
        <div className="space-y-6">
          <Skeleton isDark={isDark} className="h-8 w-3/4" />
          <Skeleton isDark={isDark} className="h-4 w-1/2" />
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} isDark={isDark} className="w-5 h-5" />
            ))}
          </div>
          <Skeleton isDark={isDark} className="h-10 w-32" />
          <div className="space-y-2">
            <Skeleton isDark={isDark} className="h-4 w-full" />
            <Skeleton isDark={isDark} className="h-4 w-full" />
            <Skeleton isDark={isDark} className="h-4 w-3/4" />
          </div>
          <Skeleton isDark={isDark} className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton