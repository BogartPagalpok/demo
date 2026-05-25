import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Zap } from 'lucide-react';
import { ShoeTheme } from '../data/shoes';

interface NavbarProps {
  theme: ShoeTheme;
  cartCount: number;
  onCartClick: () => void;
  onMenuToggle: () => void;
  menuOpen: boolean;
}

const navLinks = ['MEN', 'WOMEN', 'KIDS', 'COLLECTION'];

export default function Navbar({ theme, cartCount, onCartClick, onMenuToggle, menuOpen }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
      style={{
        background: `linear-gradient(to bottom, ${theme.primary}ee, ${theme.primary}00)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/nike.png" alt="Nike" className="h-5 w-auto" />
        <div className="w-px h-5 bg-white/20" />
        <div className="flex items-center gap-1">
          <Zap size={14} className="text-white/70" fill="currentColor" />
          <span className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">DC</span>
        </div>
      </div>

      {/* Center Nav Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-xs font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 uppercase"
              style={{ '--hover-color': theme.accent } as React.CSSProperties}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.accent)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '')}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-xs text-white placeholder-white/40 outline-none w-44 backdrop-blur-md"
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
              style={{ backgroundColor: theme.accent }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Hamburger */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 py-6 px-8 flex flex-col gap-5 md:hidden"
          style={{
            background: `${theme.primary}f0`,
            backdropFilter: 'blur(20px)',
            borderTop: `1px solid rgba(255,255,255,0.06)`,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-bold tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors text-left"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}