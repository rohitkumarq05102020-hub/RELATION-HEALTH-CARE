// Generates authentic, photorealistic pharmaceutical packaging visuals matching the real Relation Healthcare artwork and exact colors

export interface VisualCardConfig {
  name: string;
  nameColor?: string;
  genericFormula: string;
  headline: string;
  tagline: string;
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'softgel' | 'drops';
  themeColor: string; // primary packaging color (e.g. #0F2A59 navy for ACTION-SP, #581845 purple for GASTION)
  accentColor: string; // secondary accent (e.g. #D32F2F red)
  boxBgWaveColor?: string;
  indications: string[];
  keyPoints?: { title: string; points: string[] }[];
  alsoAvailable?: string;
  packingText?: string;
}

export const generateAuthenticProductCardSvg = (config: VisualCardConfig): string => {
  const {
    name,
    nameColor,
    genericFormula,
    headline,
    tagline,
    type,
    themeColor,
    accentColor,
    indications = [],
    alsoAvailable,
    packingText = type === 'capsule' ? '10 x 10 Capsules' : type === 'syrup' ? '100 ml Bottle' : '10 x 10 Tablets'
  } = config;

  const brandColor = nameColor || themeColor;
  const cleanId = name.replace(/[^a-zA-Z0-9]/g, '');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <!-- Studio Backdrop Gradient -->
      <linearGradient id="bgGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#EBF1F6"/>
      </linearGradient>

      <!-- Floor Reflection Shadow -->
      <radialGradient id="floorShadow_${cleanId}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0F172A" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#334155" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#64748B" stop-opacity="0"/>
      </radialGradient>

      <!-- 3D Box Gradients -->
      <linearGradient id="boxFrontGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="85%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#F1F5F9"/>
      </linearGradient>

      <linearGradient id="boxTopGrad_${cleanId}" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#FFFFFF"/>
      </linearGradient>

      <!-- Brand Wave Ribbon on Packaging Box -->
      <linearGradient id="brandWaveGrad_${cleanId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${themeColor}"/>
        <stop offset="70%" stop-color="${themeColor}"/>
        <stop offset="100%" stop-color="${accentColor}"/>
      </linearGradient>

      <!-- Alu-Alu Metallic Silver Foil Gradient -->
      <linearGradient id="aluAluFoil_${cleanId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E2E8F0"/>
        <stop offset="25%" stop-color="#F8FAFC"/>
        <stop offset="50%" stop-color="#CBD5E1"/>
        <stop offset="75%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#94A3B8"/>
      </linearGradient>

      <!-- Blister Pocket Highlight -->
      <linearGradient id="pocketGrad_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#F1F5F9" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#CBD5E1" stop-opacity="0.9"/>
      </linearGradient>

      <!-- Drop Shadows -->
      <filter id="packShadow_${cleanId}" x="-10%" y="-10%" width="125%" height="130%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.16"/>
      </filter>

      <filter id="stripShadow_${cleanId}" x="-10%" y="-10%" width="125%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.18"/>
      </filter>
    </defs>

    <!-- Background Canvas -->
    <rect width="800" height="600" fill="url(#bgGrad_${cleanId})"/>
    <rect y="440" width="800" height="160" fill="#E2E8F0" opacity="0.45"/>
    <line x1="0" y1="440" x2="800" y2="440" stroke="#CBD5E1" stroke-width="1.5"/>

    <!-- Subtle Background Brand Watermark -->
    <text x="400" y="85" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="64" font-weight="900" fill="${themeColor}" opacity="0.04" text-anchor="middle" letter-spacing="4">
      RELATION HEALTHCARE
    </text>

    <!-- Top Headline Banner Card -->
    <g transform="translate(40, 24)">
      <rect width="720" height="52" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="6" height="52" rx="3" fill="${themeColor}"/>
      
      <!-- Headline Text -->
      <text x="24" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="800" fill="#0F172A">
        ${headline}
      </text>
      
      <!-- Packing Specification Badge -->
      <rect x="580" y="11" width="125" height="30" rx="6" fill="${themeColor}" opacity="0.1"/>
      <rect x="580" y="11" width="125" height="30" rx="6" fill="none" stroke="${themeColor}" stroke-width="1"/>
      <text x="642" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="800" fill="${themeColor}" text-anchor="middle">
        ${packingText}
      </text>
    </g>

    <!-- Floor Shadow Under 3D Packaging -->
    <ellipse cx="270" cy="465" rx="220" ry="24" fill="url(#floorShadow_${cleanId})"/>
    <ellipse cx="570" cy="468" rx="160" ry="20" fill="url(#floorShadow_${cleanId})"/>

    <!-- ======================================================= -->
    <!-- LEFT: 3D PHARMACEUTICAL CARTON BOX (AUTHENTIC MEDICINE) -->
    <!-- ======================================================= -->
    <g transform="translate(60, 110)" filter="url(#packShadow_${cleanId})">
      
      <!-- Box Top Face (3D Perspective) -->
      <polygon points="40,0 410,0 370,40 0,40" fill="url(#boxTopGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1"/>
      
      <!-- Top Face Relation Healthcare Logo -->
      <g transform="translate(160, 10)">
        <text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" font-weight="800" fill="${themeColor}" letter-spacing="1">
          RELATION HEALTHCARE
        </text>
      </g>

      <!-- Box Front Face -->
      <rect x="0" y="40" width="370" height="280" rx="4" fill="url(#boxFrontGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1.5"/>

      <!-- Clean Pharmaceutical Header on Carton -->
      <g transform="translate(20, 60)">
        <!-- Rx Symbol in Bold Medical Red -->
        <text font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="${accentColor}" font-style="italic">
          Rx
        </text>

        <!-- Packing Badge on Carton Top Right -->
        <rect x="250" y="2" width="80" height="20" rx="4" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="290" y="15" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#475569" text-anchor="middle">
          ${packingText}
        </text>
      </g>

      <!-- Generic Formulation Description line -->
      <g transform="translate(20, 112)">
        <text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="700" fill="#475569" letter-spacing="0.2">
          ${genericFormula.length > 44 ? genericFormula.substring(0, 42) + '...' : genericFormula}
        </text>
      </g>

      <!-- BRAND NAME (GIANT, BOLD, AUTHENTIC PHARMACEUTICAL TYPOGRAPHY) -->
      <g transform="translate(20, 168)">
        <text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="44" font-weight="900" fill="${brandColor}" letter-spacing="-0.5">
          ${name}<tspan font-size="20" font-weight="700" dy="-20">™</tspan>
        </text>
      </g>

      <!-- Wave Ribbon (Exact brand swoosh on carton) -->
      <g transform="translate(0, 220)">
        <!-- Lower Accent Wave -->
        <path d="M 0 50 C 90 20, 220 75, 370 30 L 370 100 L 0 100 Z" fill="${accentColor}" opacity="0.9"/>
        <!-- Main Theme Color Wave -->
        <path d="M 0 65 C 110 35, 240 85, 370 45 L 370 100 L 0 100 Z" fill="url(#brandWaveGrad_${cleanId})"/>

        <!-- Relation Healthcare Emblem on Box Bottom Corner -->
        <g transform="translate(290, 40) scale(0.24)">
          <path d="M 100 10 L 155 68 L 132 68 C 126 100, 134 135, 195 180 L 5 180 C 66 135, 74 100, 68 68 L 45 68 Z" fill="#29B6F6"/>
          <text x="100" y="88" font-size="28" font-weight="900" fill="#D32F2F" text-anchor="middle">HC</text>
        </g>

        <!-- Company Name on Carton Base -->
        <text x="20" y="85" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
          RELATION HEALTHCARE
        </text>
      </g>

      <!-- Also Available Badge (if present) -->
      ${alsoAvailable ? `
        <g transform="translate(20, 205)">
          <rect width="180" height="24" rx="4" fill="#FFFFFF" stroke="${themeColor}" stroke-width="1.2"/>
          <text x="90" y="16" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" font-weight="800" fill="${themeColor}" text-anchor="middle">
            Also Available: <tspan fill="${accentColor}">${alsoAvailable}</tspan>
          </text>
        </g>
      ` : ''}

    </g>

    <!-- ======================================================= -->
    <!-- RIGHT: PHYSICAL BLISTER STRIP / SYRUP BOTTLE            -->
    <!-- ======================================================= -->
    <g transform="translate(450, 120)" filter="url(#stripShadow_${cleanId})">
      ${
        type === 'syrup' || type === 'drops'
          ? `<!-- Amber Pharmaceutical Syrup Bottle -->
             <g transform="translate(40, 0)">
               <!-- Bottle Neck & Cap -->
               <rect x="65" y="0" width="50" height="30" rx="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
               <!-- Measuring Cup / Cap -->
               <rect x="60" y="0" width="60" height="22" rx="4" fill="${themeColor}"/>
               <text x="90" y="15" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" text-anchor="middle">RELATION</text>
               <!-- Bottle Shoulder -->
               <path d="M 65 30 C 50 45, 20 65, 20 95 L 160 95 C 160 65, 130 45, 115 30 Z" fill="#451A03" stroke="#78350F" stroke-width="1.5"/>
               <!-- Main Amber Bottle Body -->
               <rect x="20" y="95" width="140" height="205" rx="12" fill="#451A03" stroke="#78350F" stroke-width="1.5"/>
               <!-- Bottle Glass Reflection -->
               <rect x="30" y="105" width="12" height="185" rx="4" fill="#FFFFFF" opacity="0.15"/>
               <!-- White Medicine Label -->
               <rect x="25" y="115" width="130" height="145" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
               <rect x="25" y="115" width="130" height="26" rx="4" fill="${themeColor}"/>
               <text x="90" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">RELATION HEALTHCARE</text>
               
               <text x="90" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="${brandColor}" text-anchor="middle">${name}</text>
               <text x="90" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="700" fill="#475569" text-anchor="middle">
                 ${genericFormula.length > 25 ? genericFormula.substring(0, 24) + '...' : genericFormula}
               </text>
               <rect x="35" y="196" width="110" height="22" rx="4" fill="${accentColor}"/>
               <text x="90" y="211" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">100 ml SUGAR FREE</text>
             </g>`
          : type === 'capsule'
          ? `<!-- Realistic Sustained-Release Capsule Blister Pack -->
             <!-- Metallic Alu-Alu Foil Strip Base -->
             <rect x="0" y="15" width="290" height="295" rx="12" fill="url(#aluAluFoil_${cleanId})" stroke="#94A3B8" stroke-width="1.5"/>
             
             <!-- Blister Grid: 2 columns x 5 rows = 10 capsules -->
             ${[0, 1, 2, 3, 4].map(row => `
               <!-- Column 1 Capsule -->
               <g transform="translate(30, ${35 + row * 52})">
                 <!-- Pocket Emboss -->
                 <rect x="0" y="0" width="105" height="38" rx="19" fill="url(#pocketGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1.2"/>
                 <!-- Sustained-Release Two-Tone Capsule (Deep Purple & Ivory/White) -->
                 <g transform="translate(10, 6)">
                   <!-- Left Purple Half -->
                   <path d="M 0 13 C 0 6, 6 0, 13 0 L 42 0 L 42 26 L 13 26 C 6 26, 0 20, 0 13 Z" fill="${themeColor}"/>
                   <!-- Right Ivory/Gold Half -->
                   <path d="M 42 0 L 72 0 C 79 0, 85 6, 85 13 C 85 20, 79 26, 72 26 L 42 26 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="0.8"/>
                   <!-- Capsule Shine Highlight -->
                   <rect x="10" y="3" width="65" height="4" rx="2" fill="#FFFFFF" opacity="0.5"/>
                 </g>
               </g>

               <!-- Column 2 Capsule -->
               <g transform="translate(155, ${35 + row * 52})">
                 <rect x="0" y="0" width="105" height="38" rx="19" fill="url(#pocketGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1.2"/>
                 <g transform="translate(10, 6)">
                   <path d="M 0 13 C 0 6, 6 0, 13 0 L 42 0 L 42 26 L 13 26 C 6 26, 0 20, 0 13 Z" fill="${themeColor}"/>
                   <path d="M 42 0 L 72 0 C 79 0, 85 6, 85 13 C 85 20, 79 26, 72 26 L 42 26 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="0.8"/>
                   <rect x="10" y="3" width="65" height="4" rx="2" fill="#FFFFFF" opacity="0.5"/>
                 </g>
               </g>
             `).join('')}

             <!-- Foil Imprint -->
             <text x="145" y="298" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="900" fill="#475569" text-anchor="middle" letter-spacing="1">
               RELATION HEALTHCARE · ${name}
             </text>`
          : `<!-- Realistic Alu-Alu Tablets Blister Strip (10 Tablets, 2x5) -->
             <rect x="0" y="15" width="290" height="295" rx="12" fill="url(#aluAluFoil_${cleanId})" stroke="#94A3B8" stroke-width="1.5"/>

             <!-- 10 Circular/Oval Embossed Tablet Pockets -->
             ${[0, 1, 2, 3, 4].map(row => `
               <!-- Tablet 1 -->
               <g transform="translate(35, ${35 + row * 52})">
                 <rect x="0" y="0" width="100" height="38" rx="12" fill="url(#pocketGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1.2"/>
                 <!-- White Tablet Pill Shape -->
                 <ellipse cx="50" cy="19" rx="36" ry="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
                 <line x1="50" y1="9" x2="50" y2="29" stroke="#CBD5E1" stroke-width="1.5"/>
                 <!-- Pill shine -->
                 <ellipse cx="50" cy="14" rx="26" ry="4" fill="#FFFFFF" opacity="0.8"/>
               </g>

               <!-- Tablet 2 -->
               <g transform="translate(155, ${35 + row * 52})">
                 <rect x="0" y="0" width="100" height="38" rx="12" fill="url(#pocketGrad_${cleanId})" stroke="#CBD5E1" stroke-width="1.2"/>
                 <ellipse cx="50" cy="19" rx="36" ry="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
                 <line x1="50" y1="9" x2="50" y2="29" stroke="#CBD5E1" stroke-width="1.5"/>
                 <ellipse cx="50" cy="14" rx="26" ry="4" fill="#FFFFFF" opacity="0.8"/>
               </g>
             `).join('')}

             <!-- Foil Imprint -->
             <text x="145" y="298" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="900" fill="#475569" text-anchor="middle" letter-spacing="1">
               RELATION HEALTHCARE · ${name}
             </text>`
      }
    </g>

    <!-- Bottom Clinical Highlights & Slogan Ribbon -->
    <g transform="translate(40, 500)">
      <rect width="720" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="720" height="76" rx="10" fill="${themeColor}" opacity="0.04"/>
      
      <!-- Left: Tagline / Slogan in Classic Pharmaceutical Serif -->
      <g transform="translate(24, 28)">
        <text font-family="'Playfair Display', Georgia, serif" font-size="16" font-weight="700" fill="${themeColor}" font-style="italic">
          "${tagline}"
        </text>
        <text y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#64748B">
          Quality Healthcare · Trusted Relationships Since 2016
        </text>
      </g>

      <!-- Right: Clinical Indications Bullets -->
      <g transform="translate(440, 20)">
        <text font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="${accentColor}" letter-spacing="0.5">
          INDICATIONS:
        </text>
        <g transform="translate(0, 16)">
          ${indications.slice(0, 3).map((ind, idx) => `
            <g transform="translate(${idx * 90}, 0)">
              <circle cx="4" cy="4" r="3" fill="${accentColor}"/>
              <text x="12" y="8" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#1F2937">
                ${ind.length > 12 ? ind.substring(0, 11) + '..' : ind}
              </text>
            </g>
          `).join('')}
        </g>
        <g transform="translate(0, 36)">
          ${indications.slice(3, 5).map((ind, idx) => `
            <g transform="translate(${idx * 110}, 0)">
              <circle cx="4" cy="4" r="3" fill="${accentColor}"/>
              <text x="12" y="8" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#1F2937">
                ${ind}
              </text>
            </g>
          `).join('')}
        </g>
      </g>
    </g>

  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generatePackagingSvg = (
  name: string,
  genericFormula: string,
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'softgel' | 'drops' = 'tablet',
  colorScheme: string = 'blue'
): string => {
  const colorMap: Record<string, { theme: string; accent: string }> = {
    blue: { theme: '#0F2A59', accent: '#D32F2F' },
    purple: { theme: '#581845', accent: '#B71C1C' },
    red: { theme: '#8B152B', accent: '#E11D48' },
    green: { theme: '#0F766E', accent: '#0369A1' }
  };
  const selected = colorMap[colorScheme] || colorMap.blue;

  return generateAuthenticProductCardSvg({
    name,
    genericFormula,
    headline: `Quality Healthcare Formulation - ${name}`,
    tagline: 'Quality Healthcare. Trusted Relationships.',
    type,
    themeColor: selected.theme,
    accentColor: selected.accent,
    indications: ['Clinical Care', 'Therapeutic Relief'],
    keyPoints: [
      {
        title: name,
        points: [genericFormula, 'Certified standard compliance', 'Optimal therapeutic tolerability']
      }
    ]
  });
};

export const generateHeroBannerSvg = (): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
    <defs>
      <linearGradient id="bgHero" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B2545"/>
        <stop offset="50%" stop-color="#134E5E"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <radialGradient id="glow" cx="60%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1600" height="900" fill="url(#bgHero)"/>
    <rect width="1600" height="900" fill="url(#glow)"/>
    <rect width="1600" height="900" fill="url(#grid)"/>

    <!-- Abstract Molecular & Clinical Shapes -->
    <g opacity="0.25">
      <circle cx="1150" cy="380" r="160" fill="none" stroke="#93C5FD" stroke-width="2"/>
      <circle cx="1150" cy="380" r="110" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="6,6"/>
      <circle cx="1320" cy="260" r="22" fill="#3B82F6"/>
      <line x1="1150" y1="380" x2="1320" y2="260" stroke="#93C5FD" stroke-width="2"/>
      <circle cx="1280" cy="520" r="16" fill="#60A5FA"/>
      <line x1="1150" y1="380" x2="1280" y2="520" stroke="#93C5FD" stroke-width="2"/>
      <circle cx="980" cy="460" r="20" fill="#93C5FD"/>
      <line x1="1150" y1="380" x2="980" y2="460" stroke="#93C5FD" stroke-width="2"/>
    </g>

    <!-- Sleek Clinical Architecture Floor Angle -->
    <path d="M0 720 L1600 580 L1600 900 L0 900 Z" fill="#071324" opacity="0.6"/>
    <line x1="0" y1="720" x2="1600" y2="580" stroke="#3B82F6" stroke-opacity="0.3" stroke-width="2"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generateFacilitySvg = (title: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="facBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#1E293B"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#facBg)"/>
    <g transform="translate(100, 100)" stroke="#38BDF8" stroke-width="2" fill="none" opacity="0.3">
      <rect x="0" y="0" width="600" height="380" rx="8"/>
      <line x1="0" y1="80" x2="600" y2="80"/>
      <line x1="200" y1="80" x2="200" y2="380"/>
      <line x1="400" y1="80" x2="400" y2="380"/>
    </g>
    <text x="400" y="320" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="700" fill="#F8FAFC">${title}</text>
    <text x="400" y="355" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#94A3B8">Relation Healthcare Quality Infrastructure</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generateAwardMementoSvg = (): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="100%" height="100%">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE082"/>
        <stop offset="40%" stop-color="#FFD54F"/>
        <stop offset="80%" stop-color="#FFA000"/>
        <stop offset="100%" stop-color="#FF8F00"/>
      </linearGradient>
    </defs>

    <rect width="800" height="900" fill="#0D1117"/>
    <text x="400" y="240" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="700" font-style="italic" fill="url(#goldGrad)" text-anchor="middle">
      Thank You Doctor
    </text>

    <!-- Tulip Flower stem -->
    <g transform="translate(390, 310)">
      <path d="M 10 70 Q 5 130 10 180" stroke="#4CAF50" stroke-width="4" fill="none"/>
      <path d="M 10 120 Q -25 90 -35 60 Q -20 110 8 135" fill="#66BB6A"/>
      <path d="M 10 140 Q 40 100 45 70 Q 35 120 10 155" fill="#66BB6A"/>
      <path d="M -10 65 C -25 35 -15 0 10 0 C 35 0 45 35 30 65 C 20 80 0 80 -10 65 Z" fill="#EC407A"/>
      <path d="M 0 65 C -15 40 -8 10 10 5 C 28 10 35 40 20 65 Z" fill="#F06292"/>
      <path d="M 5 65 C -5 45 0 20 10 12 C 20 20 25 45 15 65 Z" fill="#F48FB1"/>
    </g>

    <!-- Warm Divider -->
    <path d="M 0 540 Q 400 660 800 540 L 800 900 L 0 900 Z" fill="#FAF6EE"/>

    <!-- Left: Global Trophy Base -->
    <g transform="translate(100, 580)">
      <rect x="0" y="140" width="160" height="90" rx="4" fill="#000000" stroke="#334155" stroke-width="2"/>
      <rect x="10" y="125" width="140" height="15" fill="url(#goldGrad)"/>
      <circle cx="80" cy="70" r="45" fill="none" stroke="url(#goldGrad)" stroke-width="12"/>
      <circle cx="80" cy="70" r="32" fill="#E65100"/>
      <text x="80" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">THE GLOBAL</text>
      
      <text x="80" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">MR. THAKUR PRASAD MAHTO</text>
      <text x="80" y="178" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="#94A3B8" text-anchor="middle">Marketing Manager</text>
      <text x="80" y="190" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="#94A3B8" text-anchor="middle">Relation Healthcare Care Since 2016</text>
      <rect x="15" y="196" width="130" height="14" fill="#B71C1C" rx="2"/>
      <text x="80" y="206" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">BEST HEALTH MEDICINE COMPANY OF JHARKHAND</text>
    </g>

    <!-- Center Right: Relation Healthcare Name & Official Rising Arrow Logo -->
    <g transform="translate(480, 680)">
      <text x="80" y="0" font-family="'Playfair Display', Georgia, serif" font-size="32" font-weight="700" fill="#881326" text-anchor="middle">
        Relation healthcare
      </text>

      <g transform="translate(25, 20) scale(0.6)">
        <path d="M 100 10 L 155 68 L 132 68 C 126 100, 134 135, 195 180 L 5 180 C 66 135, 74 100, 68 68 L 45 68 Z" fill="#29B6F6"/>
        <text x="100" y="88" font-size="28" font-weight="900" fill="#D32F2F" text-anchor="middle">HC</text>
      </g>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
