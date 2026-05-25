import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Shoe } from '../data/shoes';

export interface CartItem {
  shoe: Shoe;
  size: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (shoeId: string, size: number) => void;
  theme: { accent: string; glowRgb: string; primary: string };
}

export default function CartDrawer({ open, items, onClose, onRemove, theme }: CartDrawerProps) {
  const total = items.reduce((sum, item) => {
    const price = typeof item.shoe.price === 'number' 
      ? item.shoe.price 
      : parseFloat(String(item.shoe.price).replace(/[^0-9.]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          backdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-400"
        style={{
          background: `linear-gradient(135deg, #0d111f 0%, #080b14 100%)`,
          borderLeft: `1px solid rgba(255,255,255,0.07)`,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} style={{ color: theme.accent }} />
            <span className="text-sm font-black tracking-[0.2em] uppercase text-white">Your Bag</span>
            {items.length > 0 && (
              <span
                className="text-[9px] font-black px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `rgba(${theme.glowRgb}, 0.15)`, color: theme.accent }}
              >
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `rgba(${theme.glowRgb}, 0.08)` }}
              >
                <ShoppingBag size={24} className="text-white/20" />
              </div>
              <p className="text-xs font-medium text-white/30 tracking-wider">Your bag is empty</p>
              <p className="text-[10px] text-white/20">Add a shoe to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.shoe.id}-${item.size}`}
                  className="flex gap-4 p-3 rounded-xl transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ background: `rgba(${item.shoe.theme.glowRgb}, 0.08)` }}
                  >
                    <img
                      src={item.shoe.image}
                      alt={item.shoe.name}
                      className="w-full h-full object-contain p-2"
                      style={{ filter: `drop-shadow(0 4px 8px rgba(${item.shoe.theme.glowRgb}, 0.3))` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase text-white truncate">{item.shoe.name}</p>
                    <p
                      className="text-[9px] font-medium tracking-wider uppercase mt-0.5"
                      style={{ color: item.shoe.theme.accent }}
                    >
                      {item.shoe.subtitle}
                    </p>
                    <p className="text-[10px] text-white/40 mt-1">Size: US {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-white">
                        {typeof item.shoe.price === 'number' ? `$${item.shoe.price}` : item.shoe.price}
                      </span>
                      <button
                        onClick={() => onRemove(item.shoe.id, item.size)}
                        className="text-white/25 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50 font-medium tracking-wider uppercase">Subtotal</span>
              <span className="text-lg font-black text-white">${total.toFixed(0)}</span>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: theme.accent,
                color: '#ffffff',
                boxShadow: `0 8px 24px rgba(${theme.glowRgb}, 0.35)`,
              }}
            >
              Checkout
              <ArrowRight size={13} />
            </button>
            <p className="text-[9px] text-center text-white/20 tracking-wider">Free shipping on orders over $150</p>
          </div>
        )}
      </div>
    </>
  );
}