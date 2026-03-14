import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Truck, MapPin } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { FulfillmentSelector } from './FulfillmentSelector';
import { LiquidButton } from './LiquidButton';
import type { CartItem } from '../types';

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-3 p-3 rounded-2xl"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold truncate" style={{ color: '#1E1B4B' }}>
          {item.product.title}
        </h4>
        <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
          ${item.product.price.toFixed(2)} each
        </p>
        <div className="flex items-center gap-1 mt-1">
          {item.fulfillmentMode === 'pickup' ? (
            <span className="inline-flex items-center gap-0.5 text-xs" style={{ color: '#7C3AED' }}>
              <MapPin className="w-3 h-3" /> Pickup: {item.product.fulfillmentOptions.estimatedPickupTime}
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-xs" style={{ color: '#0D9488' }}>
              <Truck className="w-3 h-3" /> Delivery: {item.product.fulfillmentOptions.estimatedShippingTime}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.product.id, item.fulfillmentMode)}
          className="p-1 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
          style={{ color: '#F43F5E', background: 'transparent', border: 'none' }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateQuantity(item.product.id, item.fulfillmentMode, item.quantity - 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: 'rgba(237, 233, 254, 0.6)',
              border: 'none',
              color: '#8B5CF6',
            }}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-semibold w-5 text-center" style={{ color: '#1E1B4B' }}>
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product.id, item.fulfillmentMode, item.quantity + 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: 'rgba(237, 233, 254, 0.6)',
              border: 'none',
              color: '#8B5CF6',
            }}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function CheckoutDrawer() {
  const {
    cart,
    totalPrice,
    totalItems,
    isDrawerOpen,
    setDrawerOpen,
    clearCart,
    pickupItems,
    shippingItems,
    globalFulfillmentMode,
    setGlobalFulfillmentMode,
  } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'rgba(30, 27, 75, 0.3)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:w-[440px] flex flex-col overflow-hidden"
            style={{
              backgroundColor: 'rgba(245, 243, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '-8px 0 40px rgba(167, 139, 250, 0.15)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(196, 181, 253, 0.2)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #F9A8D4, #C4B5FD)',
                    boxShadow: '0 4px 15px rgba(244, 114, 182, 0.3)',
                  }}
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: '#1E1B4B' }}>Your Cart</h2>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#6B7280',
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="w-12 h-12 mb-3" style={{ color: '#C4B5FD' }} />
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#1E1B4B' }}>
                    Cart is empty
                  </h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Add some beauty essentials ✨
                  </p>
                </div>
              ) : (
                <>
                  {/* Fulfillment Selector */}
                  <FulfillmentSelector
                    mode={globalFulfillmentMode}
                    onModeChange={setGlobalFulfillmentMode}
                  />

                  {/* Pickup Items */}
                  {pickupItems.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4" style={{ color: '#7C3AED' }} />
                        <h3 className="text-sm font-semibold" style={{ color: '#7C3AED' }}>
                          Store Pickup ({pickupItems.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <AnimatePresence>
                          {pickupItems.map((item) => (
                            <CartItemRow key={`${item.product.id}-${item.fulfillmentMode}`} item={item} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Shipping Items */}
                  {shippingItems.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Truck className="w-4 h-4" style={{ color: '#0D9488' }} />
                        <h3 className="text-sm font-semibold" style={{ color: '#0D9488' }}>
                          Delivery ({shippingItems.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <AnimatePresence>
                          {shippingItems.map((item) => (
                            <CartItemRow key={`${item.product.id}-${item.fulfillmentMode}`} item={item} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-xs font-medium hover:underline cursor-pointer"
                    style={{ color: '#F43F5E', background: 'transparent', border: 'none' }}
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="p-5 space-y-3 border-t"
                style={{ borderColor: 'rgba(196, 181, 253, 0.2)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Subtotal</span>
                  <span className="text-lg font-bold" style={{ color: '#1E1B4B' }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <LiquidButton onClick={() => {}} className="w-full">
                  Proceed to Checkout
                </LiquidButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
