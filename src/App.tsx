import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { BentoGrid } from './components/BentoGrid';

const CheckoutDrawer = lazy(() =>
  import('./components/CheckoutDrawer').then((m) => ({ default: m.CheckoutDrawer }))
);

function App() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
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
