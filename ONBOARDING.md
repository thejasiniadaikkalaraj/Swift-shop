# Engineer Onboarding: SwiftShop Codebase

Welcome to SwiftShop! This guide will help you understand the core architectural patterns and technical decisions behind the "Bubblegum Minimalism" frontend.

## 🌉 The Data Transformation Layer

Instead of consuming raw API data directly in components, we use a service-based transformation layer in `src/services/productService.ts`.

**Why this matters:**
- **Decoupling**: The UI depends on a clean internal interface, not the external API's schema.
- **Business Logic Injection**: We randomized fulfillment options (`isPickupAvailable`, etc.) at the source, simulating complex business requirements and legacy data logic.
- **UX Mocking**: The 1.5s delay is intentional to allow the Skeleton state to be visible during development/demo.

## 🧪 Glassmorphism Design System

The design isn't just "CSS in JS"—it's a token-driven system using **Tailwind CSS v4**.

**Key tokens in `src/index.css`:**
- `--color-glass-white`: Semi-transparent background for that "frosted" look.
- `--shadow-glass`: A soft, colored drop shadow using RGB values for precision.
- **Micro-animations**: Look at `LiquidButton.tsx` to see how we use `framer-motion` spring physics for high-end feel.

## ⚡ Global State & Performance

### ProductContext & useCart
We use a single `ProductContext` to avoid prop-drilling across the Bento Grid and the Checkout Drawer.
- **Cart Logic**: Grouping of "Pickup" vs "Shipping" items is computed within the context using `useMemo` for performance.
- **Fulfillment Switching**: Changing the `globalFulfillmentMode` automatically reassesses items in the cart.

### Optimization
- **Code Splitting**: The `CheckoutDrawer` is lazy-loaded. Check `src/App.tsx` to see the `Suspense` implementation.
- **CSS Transitions**: We leverage GPU-accelerated Tailwind transitions and Framer Motion layouts for 60fps animations.

## 🔍 Code Review Quality Standards

When reviewing PRs, look for:
1. **Semantic HTML**: Buttons should use `LiquidButton` or standard `<button>`, not `div` with `onClick`.
2. **Type Safety**: Ensure new features are fully typed in `src/types/index.ts`.
3. **Animations**: Use `AnimatePresence` for unmounting transitions (e.g., in `CheckoutDrawer`).
4. **Tests**: Every new feature affecting state must have a corresponding test in `src/__tests__`.

