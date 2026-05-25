import { ShoeTheme } from '../data/shoes';

interface PaginationDotsProps {
  total: number;
  active: number;
  theme: ShoeTheme;
  onChange: (index: number) => void;
}

export default function PaginationDots({ total, active, theme, onChange }: PaginationDotsProps) {
  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="group flex items-center gap-2 focus:outline-none"
          aria-label={`Go to slide ${i + 1}`}
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === active ? theme.accent : 'rgba(255,255,255,0.25)',
              boxShadow: i === active ? `0 0 8px rgba(${theme.glowRgb}, 0.8)` : 'none',
            }}
          />
        </button>
      ))}
    </div>
  );
}
