import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, ChevronDown } from 'lucide-react';
import type { FulfillmentMode } from '../types';
import { useProductContext } from '../context/ProductContext';
import { MOCK_STORES, ADDRESS_LABELS, ADDRESS_PLACEHOLDERS } from '../lib/constants';

interface FulfillmentSelectorProps {
  mode: FulfillmentMode;
  onModeChange: (mode: FulfillmentMode) => void;
}

export function FulfillmentSelector({ mode: propMode, onModeChange }: FulfillmentSelectorProps) {
  const [isStoreListExpanded, setStoreListExpanded] = useState(true);
  const [showPinWarning, setShowPinWarning] = useState(false);
  const { fulfillmentDetails, updateFulfillmentDetails, shippingItems, pickupItems } = useProductContext();

  const hasShipping = shippingItems.length > 0;
  const hasPickup = pickupItems.length > 0;

  // Internal mode for UI consistency if one type is missing
  const effectiveMode = !hasPickup ? 'shipping' : (!hasShipping ? 'pickup' : propMode);

  return (
    <div className="space-y-4">
      {/* Segmented Pill Toggle - Only show if both types are present */}
      {hasShipping && hasPickup && (
        <div
          className="relative flex p-1 rounded-full"
          style={{
            backgroundColor: 'rgba(237, 233, 254, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <motion.div
            className="absolute top-1 bottom-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #F9A8D4, #C4B5FD)',
              boxShadow: '0 2px 10px rgba(244, 114, 182, 0.3)',
              width: 'calc(50% - 4px)',
            }}
            animate={{ x: propMode === 'shipping' ? 0 : 'calc(100% + 4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          <button
            onClick={() => onModeChange('shipping')}
            className="relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors cursor-pointer"
            style={{
              color: propMode === 'shipping' ? '#FFFFFF' : '#6B7280',
              background: 'transparent',
              border: 'none',
            }}
          >
            <Truck className="w-4 h-4" />
            Delivery
          </button>
          <button
            onClick={() => onModeChange('pickup')}
            className="relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors cursor-pointer"
            style={{
              color: propMode === 'pickup' ? '#FFFFFF' : '#6B7280',
              background: 'transparent',
              border: 'none',
            }}
          >
            <MapPin className="w-4 h-4" />
            Store Pickup
          </button>
        </div>
      )}

      {/* Mode Title (if toggle is hidden) */}
      {(!hasShipping || !hasPickup) && (
        <div className="flex items-center gap-2 px-1 mb-1">
          {effectiveMode === 'shipping' ? (
            <>
              <Truck className="w-4 h-4" style={{ color: '#0D9488' }} />
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#0D9488' }}>
                Delivery Details
              </span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" style={{ color: '#7C3AED' }} />
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#7C3AED' }}>
                Store Pickup Location
              </span>
            </>
          )}
        </div>
      )}

      {/* AnimatePresence content switch */}
      <AnimatePresence mode="wait">
        {effectiveMode === 'shipping' ? (
          <motion.div
            key="shipping-form"
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-3 overflow-hidden"
          >
            <label className="block">
              <span className="text-sm font-medium" style={{ color: '#4B5563' }}>
                {ADDRESS_LABELS.shippingAddress}
              </span>
              <input
                type="text"
                value={fulfillmentDetails.shippingAddress}
                onChange={(e) => updateFulfillmentDetails({ shippingAddress: e.target.value })}
                placeholder={ADDRESS_PLACEHOLDERS.shippingAddress}
                className="mt-1 w-full px-4 py-2.5 rounded-2xl text-sm outline-none transition-shadow"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(196, 181, 253, 0.3)',
                  color: '#1E1B4B',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 3px rgba(196, 181, 253, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>
            <div className="flex gap-3">
              <label className="block flex-1">
                <span className="text-sm font-medium" style={{ color: '#4B5563' }}>
                  {ADDRESS_LABELS.zipCode}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={fulfillmentDetails.zipCode}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    if (/[^0-9]/.test(rawValue)) {
                      setShowPinWarning(true);
                      setTimeout(() => setShowPinWarning(false), 3000);
                    }
                    const value = rawValue.replace(/\D/g, '').slice(0, 6);
                    updateFulfillmentDetails({ zipCode: value });
                  }}
                  placeholder={ADDRESS_PLACEHOLDERS.zipCode}
                  className="mt-1 w-full px-4 py-2.5 rounded-2xl text-sm outline-none transition-shadow"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(196, 181, 253, 0.3)',
                    color: '#1E1B4B',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 3px rgba(196, 181, 253, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <AnimatePresence>
                  {showPinWarning && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[10px] font-bold mt-1.5 flex items-center gap-1"
                      style={{ color: '#F43F5E' }}
                    >
                      Numbers only please (6 digits)
                    </motion.p>
                  )}
                </AnimatePresence>
              </label>
              <label className="block flex-1">
                <span className="text-sm font-medium" style={{ color: '#4B5563' }}>
                  {ADDRESS_LABELS.aptSuite}
                </span>
                <input
                  type="text"
                  value={fulfillmentDetails.aptSuite}
                  onChange={(e) => updateFulfillmentDetails({ aptSuite: e.target.value })}
                  placeholder={ADDRESS_PLACEHOLDERS.aptSuite}
                  className="mt-1 w-full px-4 py-2.5 rounded-2xl text-sm outline-none transition-shadow"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(196, 181, 253, 0.3)',
                    color: '#1E1B4B',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 3px rgba(196, 181, 253, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </label>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pickup-stores"
            initial={{ opacity: 0, x: 20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              <div
                className="flex items-center justify-between mb-2 cursor-pointer select-none"
                onClick={() => setStoreListExpanded(!isStoreListExpanded)}
              >
                <span className="text-sm font-medium" style={{ color: '#4B5563' }}>
                  Select Store
                </span>
                <motion.div
                  animate={{ rotate: isStoreListExpanded ? 0 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isStoreListExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-2 overflow-hidden"
                  >
                    {MOCK_STORES.map((store) => (
                      <motion.div
                        key={store.id}
                        whileHover={{ scale: store.available ? 1.01 : 1 }}
                        whileTap={{ scale: store.available ? 0.98 : 1 }}
                        onClick={() => store.available && updateFulfillmentDetails({ storeId: store.id })}
                        className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                          store.available ? 'cursor-pointer' : 'cursor-not-allowed'
                        }`}
                        style={{
                          backgroundColor: fulfillmentDetails.storeId === store.id
                            ? 'rgba(249, 168, 212, 0.2)'
                            : 'rgba(255, 255, 255, 0.6)',
                          border: fulfillmentDetails.storeId === store.id
                            ? '1px solid rgba(249, 168, 212, 0.5)'
                            : '1px solid rgba(196, 181, 253, 0.2)',
                          boxShadow: fulfillmentDetails.storeId === store.id
                            ? '0 4px 12px rgba(249, 168, 212, 0.15)'
                            : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{
                              backgroundColor: store.available
                                ? (fulfillmentDetails.storeId === store.id ? '#F9A8D4' : 'rgba(204, 251, 241, 0.6)')
                                : 'rgba(243, 244, 246, 0.6)',
                            }}
                          >
                            <MapPin
                              className="w-4 h-4"
                              style={{ 
                                color: store.available 
                                  ? (fulfillmentDetails.storeId === store.id ? '#FFFFFF' : '#0D9488') 
                                  : '#9CA3AF' 
                              }}
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{ color: '#1E1B4B' }}
                            >
                              {store.name}
                            </p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>
                              {store.distance}
                            </p>
                          </div>
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: store.available
                              ? (fulfillmentDetails.storeId === store.id ? 'rgba(255, 255, 255, 0.8)' : 'rgba(204, 251, 241, 0.6)')
                              : 'rgba(254, 226, 226, 0.6)',
                            color: store.available 
                              ? (fulfillmentDetails.storeId === store.id ? '#F43F5E' : '#0D9488') 
                              : '#DC2626',
                          }}
                        >
                          {store.available ? (fulfillmentDetails.storeId === store.id ? 'Selected' : 'Available') : 'Unavailable'}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
