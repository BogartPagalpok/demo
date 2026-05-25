import { useState } from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { Shoe } from '../data/shoes';

interface SizeModalProps {
  open: boolean;
  shoe: Shoe;
  onClose: () => void;
  onConfirm: (size: number) => void;
}

export default function SizeModal({ open, shoe, onClose, onConfirm }: SizeModalProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const { theme } = shoe;

  const handleConfirm = () => {
    if (selected !== null) {
      onConfirm(selected);
      setSelected(null);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0d111f 0%, #080b14 100%)`,
          border: `1px solid rgba(${theme.glowRgb}, 0.15)`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(${theme.glowRgb}, 0.1)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid rgba(${theme.glowRgb}, 0.08)` }}
        >
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">{shoe.name}</h3>
            <p className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: theme.accent }}>
              Select Size — US
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Shoe Preview */}
        <div
          className="flex items-center gap-4 px-6 py-4"
          style={{ background: `rgba(${theme.glowRgb}, 0.04)` }}
        >
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `rgba(${theme.glowRgb}, 0.08)` }}
          >
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-full h-full object-contain p-1"
              style={{ filter: `drop-shadow(0 4px 12px rgba(${theme.glowRgb}, 0.4))` }}
            />
          </div>
          <div>
            <p className="text-xs font-bold text-white/60">{shoe.subtitle}</p>
            <p className="text-xl font-black text-white mt-1">
              {typeof shoe.price === 'number' ? `$${shoe.price}` : shoe.price}
            </p>
          </div>
        </div>

        {/* Size Grid */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-4 gap-2">
            {shoe.sizes.map((size) => {
              const isSelected = selected === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelected(size)}
                  className="relative py-2.5 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: isSelected ? `rgba(${theme.glowRgb}, 0.2)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isSelected ? theme.accent : 'rgba(255,255,255,0.08)'}`,
                    color: isSelected ? theme.accent : 'rgba(255,255,255,0.5)',
                    boxShadow: isSelected ? `0 0 12px rgba(${theme.glowRgb}, 0.25)` : 'none',
                  }}
                >
                  {isSelected && (
                    <span className="absolute top-0.5 right-0.5">
                      <Check size={8} style={{ color: theme.accent }} />
                    </span>
                  )}
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div className="px-6 pb-6">
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: selected !== null ? theme.accent : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              boxShadow: selected !== null ? `0 8px 24px rgba(${theme.glowRgb}, 0.35)` : 'none',
            }}
          >
            <ShoppingBag size={14} />
            {selected !== null ? `Add Size ${selected} to Bag` : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  );
}