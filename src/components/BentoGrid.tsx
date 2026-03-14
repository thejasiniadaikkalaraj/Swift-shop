import { useProductContext } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { SkeletonCard } from './SkeletonCard';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';

export function BentoGrid() {
  const { products, loading, error } = useProductContext();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Frown className="w-12 h-12 mb-4" style={{ color: '#C4B5FD' }} />
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#1E1B4B' }}>
          Oops, something went wrong
        </h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} isLarge={false} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          className="text-3xl sm:text-4xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6, #0D9488)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Beauty Essentials
        </h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Curated picks for your glow-up ✨
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isLarge={false}
            />
          );
        })}
      </div>
    </div>
  );
}
