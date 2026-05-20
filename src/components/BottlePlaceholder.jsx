export default function BottlePlaceholder({ color, className = '' }) {
  return (
    <svg 
      className={`w-full h-full drop-shadow-2xl ${className}`} 
      viewBox="0 0 200 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottle Body */}
      <path 
        d="M40 120 C40 100, 60 80, 80 70 L80 40 L120 40 L120 70 C140 80, 160 100, 160 120 L160 360 C160 380, 140 390, 100 390 C60 390, 40 380, 40 360 Z" 
        fill={color.bg} 
        stroke={color.fg} 
        strokeWidth="4"
      />
      
      {/* Bottle Cap */}
      <path 
        d="M75 10 L125 10 L125 40 L75 40 Z" 
        fill={color.fg} 
      />
      
      {/* Label Area */}
      <rect 
        x="50" 
        y="150" 
        width="100" 
        height="140" 
        rx="8" 
        fill={color.pattern} 
        fillOpacity="0.4"
      />
      
      {/* Highlights for 3D effect */}
      <path 
        d="M50 130 L50 350" 
        stroke="white" 
        strokeOpacity="0.3" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
    </svg>
  );
}
