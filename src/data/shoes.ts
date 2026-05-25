export interface ShoeTheme {
  primary: string;
  secondary: string;
  accent: string;
  accentDark: string;
  glowRgb: string;
  topRightGlow: string;
  bottomLeftGlow: string;
  buttonBorder: string;
  buttonHover: string;
}

export interface Shoe {
  id: string;
  index: number;
  name: string;
  line1: string;
  line2: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  theme: ShoeTheme;
  sizes: number[];
  tags: string[];
}

export const shoes: Shoe[] = [
  {
    id: '01',
    index: 0,
    name: 'ALPHAFLY 3',
    line1: 'ALPHAFLY',
    line2: 'PROTO',
    subtitle: 'VOLT ENERGY RETURN SUPER-SHOE',
    description:
      'The pinnacle of marathon engineering. Built with a continuous dual-density ZoomX foam bed, a full-length carbon fiber Flyplate, and twin Zoom Air pods for maximum propulsion.',
    price: '$285',
    originalPrice: '$350',
    image: '/shoes/1.png',
    theme: {
      primary: '#0d1110',
      secondary: '#071c19',
      accent: '#a3e635',
      accentDark: '#4d7c0f',
      glowRgb: '163, 230, 53',
      topRightGlow: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(163,230,53,0.3) 0%, transparent 70%)',
      bottomLeftGlow: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(77,124,15,0.2) 0%, transparent 70%)',
      buttonBorder: '#a3e635',
      buttonHover: '#a3e635',
    },
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    tags: ['RACE DAY ELITE', 'SOLD OUT'],
  },
  {
    id: '02',
    index: 1,
    name: 'ZOOM DRIVE',
    line1: 'INFRA',
    line2: 'RED',
    subtitle: 'PREMIUM SPEED PROFILE',
    description:
      'Streamlined performance silhouette optimized for instant response. Wraps the foot in lightweight engineered mesh anchored by an explosive propulsion plate layout.',
    price: '$150',
    originalPrice: '$190',
    image: '/shoes/2.png',
    theme: {
      primary: '#09090b',
      secondary: '#18181b',
      accent: '#ff4500',
      accentDark: '#dc2626',
      glowRgb: '255, 69, 0',
      topRightGlow: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(255,69,0,0.25) 0%, transparent 70%)',
      bottomLeftGlow: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(220,38,38,0.15) 0%, transparent 70%)',
      buttonBorder: '#ff4500',
      buttonHover: '#ff4500',
    },
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13],
    tags: ['FAST CAPTURE'],
  },
  {
    id: '03',
    index: 2,
    name: 'AIR MAX PLUS',
    line1: 'CHERRY',
    line2: 'STRIKER',
    subtitle: 'TUNED AIR GRADIENT',
    description:
      'An aggressive modern legend. Undulating structural TPU cage lines fuse with a deep fire-gradient textile mesh upper for high-heat lifestyle aesthetics.',
    price: '$185',
    originalPrice: '$240',
    image: '/shoes/3.png',
    theme: {
      primary: '#0e0809',
      secondary: '#1c0d0f',
      accent: '#ef233c',
      accentDark: '#b91c1c',
      glowRgb: '239, 35, 60',
      topRightGlow: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(239,35,60,0.35) 0%, transparent 70%)',
      bottomLeftGlow: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(185,28,28,0.2) 0%, transparent 70%)',
      buttonBorder: '#ef233c',
      buttonHover: '#ef233c',
    },
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    tags: ['HIGH RETENTION'],
  },
  {
    id: '04',
    index: 3,
    name: 'ZOOM X INVINCIBLE 3',
    line1: 'ZOOMX',
    line2: 'INVINCIBLE',
    subtitle: 'MAXIMUM CUSHION COMFORT',
    description:
      'Engineered to protect and perform. Utilizing an extra-thick slab of ultra-responsive ZoomX foam for extreme shock attenuation and unmatched bounce on recovery miles.',
    price: '$180',
    originalPrice: '$230',
    image: '/shoes/4.png',
    theme: {
      primary: '#060f14',
      secondary: '#0b1d28',
      accent: '#06b6d4',
      accentDark: '#0891b2',
      glowRgb: '6, 182, 212',
      topRightGlow: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(6,182,212,0.35) 0%, transparent 70%)',
      bottomLeftGlow: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(8,145,178,0.2) 0%, transparent 70%)',
      buttonBorder: '#06b6d4',
      buttonHover: '#06b6d4',
    },
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    tags: ['MAX ZOOM X'],
  },
  {
    id: '05',
    index: 4,
    name: 'AIR MAX DN',
    line1: 'DYNAMIC',
    line2: 'PURPLE',
    subtitle: 'FLAGSHIP MULTI-CHAMBER CUSHIONING',
    description:
      'Nike’s flagship sub-lifestyle sneaker. Featuring multi-pressure dynamic air cylinders that actively shift air pressure with every stride for a revolutionary bouncing sensation.',
    price: '$160',
    originalPrice: '$210',
    image: '/shoes/5.png',
    theme: {
      primary: '#080810',
      secondary: '#0c0c18',
      accent: '#a855f7',
      accentDark: '#9333ea',
      glowRgb: '168, 85, 247',
      topRightGlow: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(168,85,247,0.3) 0%, transparent 70%)',
      bottomLeftGlow: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(147,51,234,0.25) 0%, transparent 70%)',
      buttonBorder: '#a855f7',
      buttonHover: '#a855f7',
    },
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    tags: ['NEXT-GEN TECH'],
  },
];

export const getAdjacentIds = (currentIndex: number) => {
  const len = shoes.length;
  const prev = shoes[(currentIndex - 1 + len) % len];
  const next = shoes[(currentIndex + 1) % len];
  return { prev, next };
};