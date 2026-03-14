import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Truck, Star } from 'lucide-react';
import type { Product } from '../types';
import { LiquidButton } from './LiquidButton';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  index: number;
  isLarge?: boolean;
}

export function ProductCard({ product, index, isLarge = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const fulfillment = product.fulfillmentOptions;

  const [selectedMode, setSelectedMode] = React.useState<'shipping' | 'pickup'>(
    fulfillment.isShippingAvailable ? 'shipping' : 'pickup'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`group rounded-3xl overflow-hidden flex flex-col ${isLarge ? 'sm:col-span-2' : ''}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 20px rgba(167, 139, 250, 0.15)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 8px 30px rgba(167, 139, 250, 0.25)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 4px 20px rgba(167, 139, 250, 0.15)';
      }}
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${isLarge ? 'aspect-[2/1]' : 'aspect-square'}`}
        style={{ backgroundColor: 'rgba(253, 242, 248, 0.5)' }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#92400E',
          }}
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </div>
        {/* Discount badge */}
        {product.discountPercentage > 10 && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.3)',
            }}
          >
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#8B5CF6' }}>
            {product.brand}
          </p>
          <h3 className="font-semibold text-base mb-2 line-clamp-2" style={{ color: '#1E1B4B' }}>
            {product.title}
          </h3>
          {isLarge && (
            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#6B7280' }}>
              {product.description}
            </p>
          )}
        </div>

        {/* Improved Fulfillment Toggle + Info */}
        <div className="space-y-3 mb-4">
          <div 
            className="p-1 rounded-xl flex items-center gap-1"
            style={{ backgroundColor: 'rgba(243, 244, 246, 0.8)', border: '1px solid rgba(229, 231, 235, 0.5)' }}
          >
            <button
              onClick={() => setSelectedMode('shipping')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedMode === 'shipping' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: selectedMode === 'shipping' ? 'white' : 'transparent',
                color: selectedMode === 'shipping' ? '#0D9488' : '#6B7280',
              }}
            >
              <Truck className="w-3.5 h-3.5" />
              Delivery
            </button>
            <button
              disabled={!fulfillment.isPickupAvailable}
              onClick={() => setSelectedMode('pickup')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedMode === 'pickup' ? 'shadow-sm' : 'opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed'
              }`}
              style={{
                backgroundColor: selectedMode === 'pickup' ? 'white' : 'transparent',
                color: selectedMode === 'pickup' ? '#7C3AED' : '#6B7280',
              }}
            >
              <MapPin className="w-3.5 h-3.5" />
              Pickup
            </button>
          </div>

          <div className="min-h-[24px]">
            {selectedMode === 'shipping' ? (
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#0D9488' }}>
                <Truck className="w-3.5 h-3.5" />
                <span>Ships Free • {fulfillment.estimatedShippingTime}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#7C3AED' }}>
                <MapPin className="w-3.5 h-3.5" />
                <span>Available • {fulfillment.estimatedPickupTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold" style={{ color: '#1E1B4B' }}>
              ${product.price.toFixed(2)}
            </span>
          </div>
          <LiquidButton onClick={() => addToCart(product, selectedMode)} size="sm">
            <Plus className="w-4 h-4" />
            Quick Add
          </LiquidButton>
        </div>
      </div>
    </motion.div>
  );
}
