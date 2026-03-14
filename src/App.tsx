import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { BentoGrid } from './components/BentoGrid';

const CheckoutDrawer = lazy(() =>
  import('./components/CheckoutDrawer').then((m) => ({ default: m.CheckoutDrawer }))
);

function App() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div 
        className="relative w-full py-2 px-4 mb-4 text-center text-[10px] sm:text-xs font-bold rounded-full text-white overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(90deg, #F472B6, #8B5CF6, #F472B6)',
          backgroundSize: '200% auto',
          animation: 'shimmer 4s linear infinite',
          boxShadow: '0 4px 15px rgba(167, 139, 250, 0.2)',
        }}
      >
        <div className="flex animate-marquee md:justify-center md:w-full">
          <span className="px-4 whitespace-nowrap">✨ SPECIAL OFFER: FLAT 10% OFF ON YOUR FIRST ORDER • FREE PAN-INDIA DELIVERY OVER ₹499 ✨</span>
          <span className="px-4 whitespace-nowrap md:hidden">✨ SPECIAL OFFER: FLAT 10% OFF ON YOUR FIRST ORDER • FREE PAN-INDIA DELIVERY OVER ₹499 ✨</span>
        </div>
      </div>
      <Navbar />
      <main>
        <BentoGrid />
      </main>
      <Suspense fallback={null}>
        <CheckoutDrawer />
      </Suspense>
    </div>
  );
}

export default App;
