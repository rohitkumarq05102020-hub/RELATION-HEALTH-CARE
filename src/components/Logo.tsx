import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  withReflection?: boolean;
  textColor?: string;
  customLogoUrl?: string;
}

/**
 * High-definition SVG Icon for Relation Healthcare
 * Features:
 * - Rising dynamic arrow gradient (Blue #1E88E5 -> Sky #29B6F6 -> Green #4CAF50 -> Gold #FDD835)
 * - Silhouette figures on the slope helping each other climb (Mutual care & teamwork)
 * - Ornate red calligraphic 'R' in the arrowhead
 * - Bold red 'HC' (Healthcare) typography
 */
export const LogoIcon: React.FC<{
  size?: number;
  withReflection?: boolean;
  className?: string;
  idSuffix?: string;
}> = ({
  size = 48,
  withReflection = false,
  className = '',
  idSuffix = 'nav'
}) => {
  const viewBox = withReflection ? "0 0 200 240" : "0 0 200 190";
  const gradId = `rhcArrowGrad_${idSuffix}`;
  const maskGradId = `rhcReflectMask_${idSuffix}`;
  const maskId = `reflectMask_${idSuffix}`;
  const markId = `rhc-main-mark_${idSuffix}`;

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={withReflection ? size * 1.2 : size * 0.95}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Relation Healthcare Logo"
    >
      <defs>
        {/* Main Arrow Gradient: Blue base -> Green middle -> Yellow/Gold tip */}
        <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="25%" stopColor="#1E88E5" />
          <stop offset="50%" stopColor="#29B6F6" />
          <stop offset="70%" stopColor="#43A047" />
          <stop offset="88%" stopColor="#C0CA33" />
          <stop offset="100%" stopColor="#FDD835" />
        </linearGradient>

        {/* Reflection Gradient Mask */}
        <linearGradient id={maskGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <mask id={maskId}>
          <rect x="0" y="185" width="200" height="55" fill={`url(#${maskGradId})`} />
        </mask>

        {/* Drop shadow filter for crisp depth */}
        <filter id={`shadow_${idSuffix}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Main Logo Group */}
      <g id={markId} filter={`url(#shadow_${idSuffix})`}>
        {/* Upward Rising Arrow with Flared Curved Base */}
        <path
          d="M 100 10 
             L 155 68 
             L 132 68 
             C 126 100, 134 135, 195 180 
             L 5 180 
             C 66 135, 74 100, 68 68 
             L 45 68 
             Z"
          fill={`url(#${gradId})`}
          stroke="#2E7D32"
          strokeWidth="0.8"
        />

        {/* Ornate Red Calligraphic R in Upper Arrowhead */}
        <g id="rhc-monogram" fill="#D32F2F" stroke="#D32F2F">
          {/* Swashes and flourish for ornate 'R' */}
          <path
            d="M 85 45 C 83 40, 88 34, 96 34 C 104 34, 114 36, 114 43 C 114 48, 107 51, 98 52 L 115 63 C 117 64, 115 67, 112 67 C 108 67, 102 61, 97 53 C 94 53, 92 53, 90 53 L 88 64 C 88 66, 85 66, 85 63 Z M 92 48 C 96 48, 106 48, 106 42 C 106 38, 98 37, 94 37 C 91 37, 90 40, 91 44 Z"
            strokeWidth="0.5"
          />
          {/* Top flourish swirl */}
          <path
            d="M 82 40 C 82 34, 90 30, 98 30 C 104 30, 109 32, 109 34 C 109 36, 105 37, 100 35 C 93 33, 86 35, 84 39 Z"
            strokeWidth="0.3"
          />

          {/* Bold Red "HC" */}
          <text
            x="100"
            y="88"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            fontSize="28"
            fontWeight="900"
            fill="#D32F2F"
            textAnchor="middle"
            letterSpacing="0.5"
            stroke="none"
          >
            HC
          </text>
        </g>

        {/* Silhouette Figures on Left Slope: Teamwork / Mutual Help */}
        <g id="rhc-figures" fill="#0F172A">
          {/* Higher Figure (Leader/Helper bending back & pulling) */}
          <circle cx="68" cy="116" r="6" />
          {/* Torso & Arms */}
          <path
            d="M 68 123 
               C 65 125, 59 130, 52 135 
               C 46 139, 39 146, 35 152
               L 33 150
               C 38 143, 46 136, 52 131
               C 60 126, 64 122, 67 121
               Z"
          />
          {/* Body and Legs climbing */}
          <path
            d="M 68 123 
               L 80 137 
               L 77 142 
               L 65 130 
               Z"
          />
          {/* Forward Arm */}
          <path
            d="M 72 125 
               C 78 126, 85 132, 92 139 
               L 89 142 
               C 83 135, 77 130, 70 128 
               Z"
          />
          {/* Legs */}
          <path
            d="M 80 137 L 91 154 L 86 156 L 76 142 Z"
          />
          <path
            d="M 78 138 L 73 155 L 68 154 L 74 140 Z"
          />

          {/* Lower Figure (Reaching out, taking hand, climbing up slope) */}
          <circle cx="28" cy="142" r="5.5" />
          {/* Reaching Arm holding hand */}
          <path
            d="M 29 148 
               C 32 147, 36 148, 42 148 
               C 46 148, 50 144, 53 138 
               L 55 140 
               C 51 147, 47 151, 41 151 
               C 36 151, 32 150, 28 151 
               Z"
          />
          {/* Torso */}
          <path
            d="M 28 148 L 22 162 L 18 160 L 25 147 Z"
          />
          {/* Left Arm for balance */}
          <path
            d="M 25 150 C 18 153, 14 158, 10 163 L 8 160 C 12 155, 17 150, 24 147 Z"
          />
          {/* Legs climbing on arrow base */}
          <path
            d="M 22 162 L 28 178 L 24 179 L 19 164 Z"
          />
          <path
            d="M 20 163 L 13 177 L 9 175 L 17 162 Z"
          />
        </g>
      </g>

      {/* Optional Mirror Reflection Below Base */}
      {withReflection && (
        <g
          transform="translate(0, 360) scale(1, -1)"
          opacity="0.35"
          mask={`url(#${maskId})`}
        >
          <use href={`#${markId}`} />
        </g>
      )}
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 46,
  showText = true,
  withReflection = false,
  textColor = 'text-slate-900',
  customLogoUrl
}) => {
  const numSize = Number(size) || 46;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Logo Badge Container */}
      <div className="relative shrink-0 flex items-center justify-center p-1 rounded-xl bg-white border border-slate-200/80 shadow-xs ring-1 ring-slate-100">
        {customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt="Relation Healthcare Logo"
            style={{ width: numSize, height: numSize }}
            className="object-contain rounded-lg"
          />
        ) : (
          <LogoIcon size={numSize} withReflection={withReflection} />
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`text-xl sm:text-2xl font-black tracking-tight ${textColor} leading-tight`}>
            RELATION HEALTHCARE
          </span>
          <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase -mt-0.5">
            Pharmaceutical Care
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
