import React from "react";

const GMLogo = ({ className = "w-12 h-12" }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_15px_rgba(244,63,94,0.4)]"
      >
        <defs>
          {/* Royal Gradient: Gold to Rose Pink */}
          <linearGradient
            id="gmIntegratedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FACC15" /> {/* Vibrant Gold */}
            <stop offset="40%" stopColor="#FB7185" /> {/* Rose Pink */}
            <stop offset="100%" stopColor="#E11D48" /> {/* Deep Royal Rose */}
          </linearGradient>

          {/* Premium Glow Filter */}
          <filter id="royalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Crest Frame */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#gmIntegratedGradient)"
          strokeWidth="1.5"
          className="opacity-40"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#gmIntegratedGradient)"
          strokeWidth="2"
          strokeDasharray="6 3"
          className="opacity-70"
        />

        {/* Main Monogram: Combined G + M in single stroke style */}
        <g filter="url(#royalGlow)">
          {/* 1. Main Outer 'G' Curve */}
          <path
            d="M 62 30 
               C 52 18, 26 22, 22 46 
               C 17 72, 42 85, 64 72 
               C 74 65, 74 52, 74 50 
               L 48 50"
            stroke="url(#gmIntegratedGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 2. Embedded 'M' (Crown/Mukut shape) inside top-left of 'G' */}
          <path
            d="M 28 42 
               L 33 26 
               L 40 34 
               L 48 26 
               L 52 40"
            stroke="url(#gmIntegratedGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Sparkling Diamonds on Crown Tips */}
        <circle cx="33" cy="24" r="1.5" fill="#FACC15" />
        <circle cx="40" cy="32" r="1.5" fill="#FACC15" />
        <circle cx="48" cy="24" r="1.5" fill="#FACC15" />
      </svg>
    </div>
  );
};

export default GMLogo;
