export default function DynamicBackground({ pattern, color }) {
  // We'll use CSS shapes/SVGs to simulate the background patterns from the labels
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: color.bg }}>
      <svg className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {pattern === 'monstera' && (
          <path d="M10,10 Q30,50 10,90 Q50,70 90,90 Q70,50 90,10 Q50,30 10,10" fill={color.pattern} />
        )}
        {pattern === 'geometry' && (
          <path d="M0,50 Q25,0 50,50 T100,50 M0,20 L100,20 M0,80 L100,80" stroke={color.pattern} strokeWidth="2" fill="none" />
        )}
        {pattern === 'brush' && (
          <path d="M20,20 Q40,40 30,60 M70,30 Q90,50 80,80 M10,80 Q30,70 50,90" stroke={color.pattern} strokeWidth="6" strokeLinecap="round" fill="none" />
        )}
        {pattern === 'flowers' && (
          <circle cx="50" cy="50" r="20" stroke={color.pattern} strokeWidth="2" fill="none" strokeDasharray="4 4" />
        )}
        {pattern === 'wood' && (
          <path d="M10,0 Q30,50 10,100 M30,0 Q50,50 30,100 M50,0 Q70,50 50,100 M70,0 Q90,50 70,100 M90,0 Q110,50 90,100" stroke={color.pattern} strokeWidth="4" fill="none" />
        )}
        {pattern === 'waves' && (
          <path d="M0,30 Q25,10 50,30 T100,30 M0,60 Q25,40 50,60 T100,60" stroke={color.pattern} strokeWidth="5" fill="none" />
        )}
        {pattern === 'topo' && (
          <path d="M50,50 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 M50,50 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 M50,50 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0" stroke={color.pattern} strokeWidth="1" fill="none" />
        )}
        {pattern === 'floral' && (
          <path d="M20,20 L40,40 L20,60 L0,40 Z M80,40 L100,60 L80,80 L60,60 Z" fill={color.pattern} />
        )}
        {pattern === 'blobs' && (
          <path d="M20,50 Q40,10 70,30 T80,80 T30,80 Z" fill={color.pattern} />
        )}
        {pattern === 'confetti' && (
          <>
            <rect x="20" y="20" width="10" height="10" fill="#2550A4" transform="rotate(45 25 25)" />
            <rect x="70" y="30" width="8" height="8" fill="#E4C969" transform="rotate(20 74 34)" />
            <rect x="40" y="70" width="12" height="12" fill="#A63C45" transform="rotate(60 46 76)" />
            <rect x="80" y="80" width="10" height="10" fill="#784638" transform="rotate(15 85 85)" />
          </>
        )}
      </svg>
      {/* Fallback general gradient overlay to make it look smooth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
    </div>
  );
}
