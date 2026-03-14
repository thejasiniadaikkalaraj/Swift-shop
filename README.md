# SwiftShop – Bubblegum-Minimal Edition

A high-fidelity, high-performance e-commerce frontend showcasing modern web design (Bubblegum Minimalism) and senior-level architecture.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## 🏗 Project Structure

```text
src/
├── components/     # UI Components (Navbar, ProductCard, Drawer, etc.)
├── context/        # Global State (ProductContext.tsx)
├── hooks/          # Custom Hooks (useCart.ts)
├── lib/            # Utilities (utils.ts)
├── services/       # Data Layer (productService.ts)
├── types/          # TypeScript Interfaces
└── __tests__/      # Unit Tests
```

## 🎨 Design System

We use a **Bubblegum Minimalism** theme. Key design tokens are defined in `src/index.css` using the Tailwind v4 `@theme` block:
- **Colors**: Lavender Light, Pink Soft, Teal Accent, Glass White.
- **Glassmorphism**: 20px backdrop blur and semi-transparent backgrounds.
- **Typography**: `Outfit` from Google Fonts.
- **Shadows**: Custom colored shadows for cards (`shadow-glass`).

## 🧪 Testing

We use Vitest for unit and integration testing. Tests are located in `src/__tests__`.
Current coverage includes:
- Cart state management (add/remove/update logic).
- Fulfillment mode switching logic.
- Total price calculations.
