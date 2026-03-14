import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export function Navbar() {
  const { totalItems, toggleDrawer } = useCart();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 30px rgba(244, 114, 182, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #F9A8D4, #C4B5FD)',
                boxShadow: '0 4px 15px rgba(244, 114, 182, 0.3)',
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl sm:text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SwiftShop
            </span>
          </motion.div>

          {/* Cart Button */}
          <motion.button
            onClick={toggleDrawer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-full cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 4px 20px rgba(167, 139, 250, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
            id="cart-button"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#8B5CF6' }} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                    boxShadow: '0 2px 8px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
