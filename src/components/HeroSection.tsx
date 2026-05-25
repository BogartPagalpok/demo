import { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Shoe } from '../data/shoes';

interface HeroSectionProps {
  shoe: Shoe;
  transitioning: boolean;
  onLearnMore: () => void;
  onAddToCart: () => void;
}

export default function HeroSection({ shoe, transitioning, onLearnMore, onAddToCart }: HeroSectionProps) {
  const [learnHovered, setLearnHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [shoe.id]);

  return (
    <section className="relative flex-1 flex flex-col lg:flex-row items-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 min-h-[calc(100vh-6rem)]">
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

      {/* Main Responsive Layout Layer */}
      <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-4 items-center justify-between pt-8 pb-6 lg:py-0 min-h-[calc(100vh-6rem)]">

        {/* Content Segment: Typography and CTAs */}
        <div
          className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start gap-4 md:gap-5 z-10 w-full"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(-15px) lg:translateY(0) lg:translateX(-24px)' : 'translateY(0) translateX(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Tags */}
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start order-1">
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

          {/* Hero Title Stack - Sits natively at the top on Mobile layout views */}
          <div className="order-2">
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
              className="mt-3 text-xs md:text-sm font-bold tracking-[0.35em] uppercase"
              style={{ color: `rgba(${shoe.theme.glowRgb}, 0.8)` }}
            >
              {shoe.subtitle}
            </p>
          </div>

          {/* Spacer to push mobile elements below the absolute centered shoe viewport */}
          <div className="h-[28vh] sm:h-[35vh] lg:hidden order-3" />

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed font-light hidden md:block order-4">
            {shoe.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 order-5 justify-center lg:justify-start">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-current" style={{ color: shoe.theme.accent }} />
              ))}
            </div>
            <span className="text-xs text-white/40 font-medium">4.9 (2.4k reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 order-6 justify-center lg:justify-start">
            <div>
              <span className="text-2xl font-black text-white">{shoe.price}</span>
              <span className="text-sm text-white/30 line-through ml-2">{shoe.originalPrice}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 flex-wrap justify-center lg:justify-start order-7 w-full sm:w-auto">
            {/* Preview Button */}
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

            {/* Add to Bag Button */}
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
        </div>

        {/* Right Desktop Column: Outlined Slogan + Details */}
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

      {/* Centerpiece Layer: Large shoe centered vertically on mobile, shifted right on desktop */}
      <div
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center pl-0 lg:pl-[12vw] top-[6rem] lg:top-0 h-[50vh] lg:h-full"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.95) translateY(15px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Aura Glow behind the overlay shoe */}
        <div
          className="absolute rounded-full blur-3xl w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem]"
          style={{
            background: `radial-gradient(circle, rgba(${shoe.theme.glowRgb}, 0.28) 0%, transparent 70%)`,
          }}
        />

        <div className="relative shoe-float w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-[34rem] lg:max-w-[46rem] xl:max-w-[54rem]">
          <img
            src={shoe.image}
            alt={shoe.name}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-contain transition-opacity duration-500"
            style={{
              opacity: imageLoaded ? 1 : 0,
              filter: `drop-shadow(0 24px 48px rgba(${shoe.theme.glowRgb}, 0.45)) drop-shadow(0 12px 24px rgba(0,0,0,0.75))`,
              transform: 'rotate(-12deg)',
            }}
          />
          {/* Ground Contact Depth Shadow */}
          <div
            className="absolute bottom-[-10px] md:bottom-[-20px] left-1/2 -translate-x-1/2 w-4/5 h-4 md:h-8 rounded-full blur-2xl"
            style={{ backgroundColor: `rgba(${shoe.theme.glowRgb}, 0.3)` }}
          />
        </div>
      </div>
    </section>
  );
}
