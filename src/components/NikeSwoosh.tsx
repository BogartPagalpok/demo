interface NikeSwooshProps {
  className?: string;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function NikeSwoosh({ className = '', opacity = 0.06, color = '#ffffff', style }: NikeSwooshProps) {
  return (
    <svg
      viewBox="0 0 600 220"
      className={className}
      style={{ opacity, ...style }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M598 18C560 52 480 90 380 108C300 122 220 118 148 96C90 78 46 48 20 18C14 10 10 4 8 0C2 8 0 20 2 34C6 58 26 86 58 108C96 134 148 150 208 158C278 168 360 162 436 138C494 118 544 88 574 54C586 40 594 26 598 18Z"
        fill={color}
      />
    </svg>
  );
}