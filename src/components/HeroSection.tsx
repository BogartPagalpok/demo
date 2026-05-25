import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Shoe } from '../data/shoes';

interface HeroSectionProps {
  shoe: Shoe;
  transitioning: boolean;
  onLearnMore: () => void;
  onAddToCart: () => void;
  onNextShoe?: () => void;
  onPrevShoe?: () => void;
}

export default function HeroSection({ 
  shoe, 
  transitioning, 
  onLearnMore, 
  onAddToCart,
  onNextShoe,
  onPrevShoe 
}: HeroSectionProps) {
  const [learnHovered, setLearnHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const touchStartY = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    setImageLoaded(false);
  }, [shoe.id]);

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return;

    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0 && onNextShoe) {
        onNextShoe();
        lastScrollTime.current = now;
      } else if (e.deltaY < 0 && onPrevShoe) {
        onPrevShoe();
        lastScrollTime.current = now;
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 40) { // Slightly optimized threshold for better mobile tracking response
      if (deltaY > 0 && onNextShoe) {
        onNextShoe();
        lastScrollTime.current = now;
      } else if (deltaY < 0 && onPrevShoe) {
        onPrevShoe();
        lastScrollTime.current = now;
      }
    }
  };

  return (
    <section 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative flex-1 flex flex-col lg:flex-row items-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 min-h-[calc(100vh-6rem)] select-none"
    >
      {/* Giant Swoosh Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/nike.png"
          alt=""
          className="absolute w-[95vw] max-w-5xl"
          style={{
            top: '52%',
            left: '52%',
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            opacity: transitioning ? 0 : 0.06,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* Main Responsive Layout Grid */}
      <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] items-stretch justify-between pt-6 pb-4 lg:py-0 min-h-[calc(100vh-6rem)]">
        
        {/* Mobile/Desktop Content Coordinator */}
        <div
          className="flex flex-col flex-1 lg:flex-initial justify-between lg:justify-center text-center lg:text-left items-center lg:items-start gap-4 lg:gap-5 z-10 w-full"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(-15px) lg:translateY(0) lg:translateX(-24px)' : 'translateY(0) translateX(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Top Text Cluster */}
          <div className="flex flex-col items-center lg:items-start gap-3 w-full">
            {/* Tags */}
            <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
              {shoe.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black tracking-[0.3em] px-3 py-1 rounded-full uppercase border"
                  style={{
                    borderColor: `rgba(${shoe.theme.glowRgb}, 0.5)`,
                    color: shoe.theme.accent,
                    backgroundColor: `rgba(${shoe.theme.glowRgb}, 0.08)`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title Block */}
            <div>
              <h1 className="font-black uppercase leading-[0.9] tracking-tight">
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white"
                  style={{ textShadow: `0 0 80px rgba(${shoe.theme.glowRgb}, 0.3)` }}
                >
                  {shoe.line1}
                </span>
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  style={{
                    color: shoe.theme.accent,
                    textShadow: `0 0 40px rgba(${shoe.theme.glowRgb}, 0.5)`,
                  }}
                >
                  {shoe.line2}
                </span>
              </h1>
              <p
                className="mt-2.5 text-xs md:text-sm font-bold tracking-[0.35em] uppercase"
                style={{ color: `rgba(${shoe.theme.glowRgb}, 0.8)` }}
              >
                {shoe.subtitle}
              </p>
            </div>
          </div>

          {/* Center Showcase Container (Mobile) - Enabled pointer events to capture touch swipe parameters cleanly */}
          <div className="relative flex lg:hidden items-center justify-center w-full flex-[1.3] my-2 min-h-[28vh] max-h-[38vh]">
            <div
              className="absolute rounded-full blur-3xl w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(${shoe.theme.glowRgb}, 0.28) 0%, transparent 70%)`,
              }}
            />
            <div className="relative shoe-float w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] pointer-events-none">
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-full h-full object-contain"
                style={{
                  filter: `drop-shadow(0 20px 40px rgba(${shoe.theme.glowRgb}, 0.45)) drop-shadow(0 10px 20px rgba(0,0,0,0.75))`,
                  transform: 'rotate(-12deg)',
                }}
              />
              <div
                className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4/5 h-4 rounded-full blur-xl"
                style={{ backgroundColor: `rgba(${shoe.theme.glowRgb}, 0.3)` }}
              />
            </div>
          </div>

          {/* Bottom Content Cluster */}
          <div className="flex flex-col items-center lg:items-start gap-3 md:gap-4 w-full">
            {/* Description */}
            <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed font-light hidden md:block">
              {shoe.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-current" style={{ color: shoe.theme.accent }} />
                ))}
              </div>
              <span className="text-xs text-white/40 font-medium">4.9 (2.4k reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div>
                <span className="text-2xl font-black text-white">{shoe.price}</span>
                <span className="text-sm text-white/30 line-through ml-2">{shoe.originalPrice}</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex gap-3 flex-wrap justify-center lg:justify-start w-full sm:w-auto mt-1">
              <button
                onMouseEnter={() => setLearnHovered(true)}
                onMouseLeave={() => setLearnHovered(false)}
                onClick={onLearnMore}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 flex-1 sm:flex-initial"
                style={{
                  border: `1.5px solid ${shoe.theme.buttonBorder}`,
                  backgroundColor: learnHovered ? shoe.theme.accent : 'transparent',
                  color: learnHovered ? '#ffffff' : shoe.theme.accent,
                  boxShadow: learnHovered ? `0 0 24px rgba(${shoe.theme.glowRgb}, 0.5)` : 'none',
                }}
              >
                Preview
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onMouseEnter={() => setAddHovered(true)}
                onMouseLeave={() => setAddHovered(false)}
                onClick={onAddToCart}
                className="px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 text-white flex-1 sm:flex-initial"
                style={{
                  backgroundColor: addHovered ? shoe.theme.accent : `rgba(255,255,255,0.08)`,
                  border: `1.5px solid rgba(255,255,255,0.1)`,
                  boxShadow: addHovered ? `0 0 24px rgba(${shoe.theme.glowRgb}, 0.4)` : 'none',
                }}
              >
                Add to Bag
              </button>
            </div>

            {/* ILLUSIVE STUDIO Brand Signature */}
            <div className="flex flex-col items-center pt-4 lg:hidden opacity-80 mt-1">
              <span className="text-[9px] font-black tracking-[0.4em] text-white/50 uppercase leading-none">
                ILLUSIVE STUDIO
              </span>
              <span className="text-[7px] font-bold tracking-[0.2em] text-white/20 uppercase mt-1">
                CONCEPT DESIGN LAB
              </span>
            </div>
          </div>
        </div>

        {/* Right Desktop Column */}
        <div
          className="hidden lg:flex flex-col items-end justify-center gap-6 z-10 w-full"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateX(24px)' : 'translateX(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* JUST DO IT — outlined */}
          <div className="text-right">
            {['JUST', 'DO', 'IT'].map((word, i) => (
              <div
                key={word}
                className="font-black uppercase leading-[0.95] select-none"
                style={{
                  fontSize: i === 0 ? 'clamp(2.5rem, 4.5vw, 5.5rem)' : i === 1 ? 'clamp(4rem, 6.5vw, 8.5rem)' : 'clamp(3rem, 5.5vw, 7rem)',
                  WebkitTextStroke: `1.5px rgba(255,255,255,${i === 0 ? '0.15' : i === 1 ? '0.25' : '0.1'})`,
                  color: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                {word}
              </div>
            ))}
          </div>

          {/* Vertical stats */}
          <div className="flex flex-col gap-4 mt-4">
            {[
              { label: 'Weight', value: '198g' },
              { label: 'Drop', value: '8mm' },
              { label: 'Stack', value: '32mm' },
            ].map(({ label, value }) => (
              <div key={label} className="text-right">
                <div className="text-xs font-black text-white/80 tracking-wider">{value}</div>
                <div className="text-[9px] font-medium tracking-[0.25em] uppercase text-white/30">{label}</div>
              </div>
            ))}
          </div>

          {/* ILLUSIVE STUDIO Footer Brand Signature Lock */}
          <div className="flex flex-col items-end justify-center pt-4">
            <span className="text-[10px] font-black tracking-[0.4em] text-white/60 uppercase leading-none">
              ILLUSIVE STUDIO
            </span>
            <span className="text-[7px] font-bold tracking-[0.2em] text-white/20 uppercase mt-1">
              CONCEPT DESIGN LAB
            </span>
          </div>
        </div>
      </div>

      {/* Absolute Overlay Layer: Desktop Presentation Viewport Only */}
      <div
        className="hidden lg:flex absolute inset-0 z-20 pointer-events-none items-center justify-center pl-[12vw]"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.95) translateY(15px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="absolute rounded-full blur-3xl w-[40rem] h-[40rem]"
          style={{
            background: `radial-gradient(circle, rgba(${shoe.theme.glowRgb}, 0.28) 0%, transparent 70%)`,
          }}
        />

        <div className="relative shoe-float w-full max-w-[34rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[58rem]">
          <img
            src={shoe.image}
            alt={shoe.name}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-contain transition-opacity duration-500"
            style={{
              opacity: imageLoaded ? 1 : 0,
              filter: `drop-shadow(0 32px 64px rgba(${shoe.theme.glowRgb}, 0.45)) drop-shadow(0 16px 32px rgba(0,0,0,0.75))`,
              transform: 'rotate(-12deg)',
            }}
          />
          <div
            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full blur-2xl"
            style={{ backgroundColor: `rgba(${shoe.theme.glowRgb}, 0.3)` }}
          />
        </div>
      </div>
    </section>
  );
}
