import { useState, useCallback } from 'react';
import { shoes } from './data/shoes';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PaginationDots from './components/PaginationDots';
import CartDrawer, { CartItem } from './components/CartDrawer';
import SizeModal from './components/SizeModal';
import VideoModal from './components/VideoModal';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const currentShoe = shoes[currentIndex];

  const navigate = useCallback(
    (targetIndex: number) => {
      if (transitioning || targetIndex === currentIndex) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setTransitioning(false);
      }, 400);
    },
    [transitioning, currentIndex]
  );

  const handleAddToCart = useCallback(
    (size: number) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.shoe.id === currentShoe.id && i.size === size);
        if (existing) {
          return prev.map((i) =>
            i.shoe.id === currentShoe.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { shoe: currentShoe, size, quantity: 1 }];
      });
      setCartOpen(true);
    },
    [currentShoe]
  );

  const handleRemoveFromCart = useCallback((shoeId: string, size: number) => {
    setCartItems((prev) => prev.filter((i) => !(i.shoe.id === shoeId && i.size === size)));
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col select-none"
      style={{
        backgroundColor: currentShoe.theme.primary,
        transition: 'background-color 0.6s ease',
      }}
    >
      {/* Ambient Background Layers */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: currentShoe.theme.topRightGlow,
          transition: 'background 0.6s ease',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: currentShoe.theme.bottomLeftGlow,
          transition: 'background 0.6s ease',
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px',
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Navbar */}
      <Navbar
        theme={currentShoe.theme}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onMenuToggle={() => setMenuOpen((v) => !v)}
        menuOpen={menuOpen}
      />

      {/* Pagination Dots */}
      <PaginationDots
        total={shoes.length}
        active={currentIndex}
        theme={currentShoe.theme}
        onChange={navigate}
      />

      {/* Hero */}
      <HeroSection
        shoe={currentShoe}
        transitioning={transitioning}
        onLearnMore={() => setVideoModalOpen(true)}
        onAddToCart={() => setSizeModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        theme={currentShoe.theme}
      />

      <SizeModal
        open={sizeModalOpen}
        shoe={currentShoe}
        onClose={() => setSizeModalOpen(false)}
        onConfirm={handleAddToCart}
      />

      <VideoModal
        open={videoModalOpen}
        shoe={currentShoe}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
}