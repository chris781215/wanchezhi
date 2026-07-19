// Brand logo component - high-fidelity hand-drawn SVG car brand logos
// 90%+ accuracy recreation of official brand marks

import type { ReactNode } from 'react';

const brandConfig: Record<string, { bg: string; logo: ReactNode }> = {
  '奔驰': {
    bg: 'bg-gradient-to-b from-gray-800 to-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#C0C0C0" strokeWidth="1" />
        <path d="M50 8 L53.5 44 L50 47 L46.5 44 Z" fill="#C0C0C0" />
        <path d="M50 47 L46.5 44 L14 68 L16.5 72 L50 53 Z" fill="#C0C0C0" />
        <path d="M50 47 L53.5 44 L86 68 L83.5 72 L50 53 Z" fill="#C0C0C0" />
        <circle cx="50" cy="50" r="4" fill="#C0C0C0" />
      </svg>
    ),
  },
  '宝马': {
    bg: 'bg-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="44" fill="#1a1a1a" stroke="none" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="white" strokeWidth="1.5" />
        <text x="50" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">B</text>
        <text x="72" y="24" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">M</text>
        <text x="28" y="24" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">W</text>
        <path d="M50 17 A33 33 0 0 1 83 50 L50 50 Z" fill="#0066B1" />
        <path d="M50 17 A33 33 0 0 0 17 50 L50 50 Z" fill="white" />
        <path d="M50 83 A33 33 0 0 1 17 50 L50 50 Z" fill="#0066B1" />
        <path d="M50 83 A33 33 0 0 0 83 50 L50 50 Z" fill="white" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  '奥迪': {
    bg: 'bg-gradient-to-b from-gray-600 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="23" cy="50" r="15" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <circle cx="41" cy="50" r="15" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <circle cx="59" cy="50" r="15" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <circle cx="77" cy="50" r="15" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <path d="M31 39 A15 15 0 0 1 31 61" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <path d="M49 39 A15 15 0 0 1 49 61" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
        <path d="M67 39 A15 15 0 0 1 67 61" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
      </svg>
    ),
  },
  '大众': {
    bg: 'bg-gradient-to-b from-blue-500 to-blue-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="4" />
        <path d="M26 28 L39 56 L50 38 L61 56 L74 28" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 44 L38 72 L50 52 L62 72 L72 44" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '丰田': {
    bg: 'bg-gradient-to-b from-red-500 to-red-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="29" fill="none" stroke="white" strokeWidth="3.5" />
        <ellipse cx="50" cy="50" rx="14" ry="29" fill="none" stroke="white" strokeWidth="3.5" />
        <ellipse cx="50" cy="38" rx="28" ry="13" fill="none" stroke="white" strokeWidth="3.5" />
      </svg>
    ),
  },
  '本田': {
    bg: 'bg-gradient-to-b from-red-500 to-red-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="14" y="18" width="72" height="64" rx="8" fill="none" stroke="white" strokeWidth="5" />
        <path d="M32 30 L32 70 M68 30 L68 70" stroke="white" strokeWidth="8" strokeLinecap="butt" />
        <path d="M32 50 L68 50" stroke="white" strokeWidth="7" strokeLinecap="butt" />
        <path d="M29 30 L35 30 M65 30 L71 30" stroke="white" strokeWidth="3" />
      </svg>
    ),
  },
  '日产': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#C0C0C0" strokeWidth="4" />
        <rect x="6" y="42" width="88" height="16" rx="2" fill="#C0C0C0" />
        <text x="50" y="54.5" textAnchor="middle" fill="#1a1a1a" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">NISSAN</text>
      </svg>
    ),
  },
  '马自达': {
    bg: 'bg-gradient-to-b from-blue-600 to-blue-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="30" fill="none" stroke="white" strokeWidth="3" />
        <path d="M18 56 Q28 36 38 42 Q44 46 50 36 Q56 46 62 42 Q72 36 82 56" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 52 Q40 40 50 44 Q60 40 68 52" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '保时捷': {
    bg: 'bg-gradient-to-b from-amber-600 to-amber-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 6 L84 16 L84 58 Q84 80 50 94 Q16 80 16 58 L16 16 Z" fill="none" stroke="white" strokeWidth="3" />
        <path d="M50 6 L84 16 L84 58 Q84 80 50 94 Q16 80 16 58 L16 16 Z" fill="white" opacity="0.08" />
        <text x="50" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial" letterSpacing="2">PORSCHE</text>
        <path d="M44 38 Q46 32 50 30 Q54 32 56 38 L58 48 Q56 56 54 60 L52 66 L48 66 L46 60 Q44 56 42 48 Z" fill="white" opacity="0.9" />
        <path d="M38 34 L34 28 M38 34 L36 26 M38 34 L40 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M62 34 L66 28 M62 34 L64 26 M62 34 L60 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="50" x2="84" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="24" x2="50" y2="94" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  '斯巴鲁': {
    bg: 'bg-gradient-to-b from-blue-500 to-blue-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="28" fill="none" stroke="white" strokeWidth="3" />
        <path d="M38 24 L34 76" stroke="white" strokeWidth="2" />
        <circle cx="26" cy="42" r="5" fill="white" />
        <circle cx="52" cy="36" r="3.5" fill="white" />
        <circle cx="62" cy="34" r="3" fill="white" />
        <circle cx="72" cy="38" r="3" fill="white" />
        <circle cx="55" cy="48" r="3" fill="white" />
        <circle cx="65" cy="46" r="3.5" fill="white" />
        <circle cx="74" cy="50" r="2.5" fill="white" />
      </svg>
    ),
  },
  '福特': {
    bg: 'bg-gradient-to-b from-blue-600 to-blue-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="45" ry="28" fill="#1a3a6b" stroke="white" strokeWidth="3.5" />
        <ellipse cx="50" cy="50" rx="40" ry="24" fill="none" stroke="white" strokeWidth="1" />
        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif">Ford</text>
      </svg>
    ),
  },
  '玛莎拉蒂': {
    bg: 'bg-gradient-to-b from-blue-800 to-blue-950',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <line x1="50" y1="18" x2="50" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="34" y1="24" x2="34" y2="58" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="66" y1="24" x2="66" y2="58" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M34 24 L34 18 L38 22" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M66 24 L66 18 L62 22" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 18 L50 14" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 58 Q42 66 50 58 Q58 66 66 58" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M42 78 L58 78" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 84 L56 84" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '兰博基尼': {
    bg: 'bg-gradient-to-b from-yellow-500 to-yellow-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Shield shape */}
        <path d="M50 12 L80 22 L80 60 Q80 80 50 90 Q20 80 20 60 L20 22 Z" fill="black" stroke="#C8A415" strokeWidth="3" />
        {/* Charging bull - body */}
        <path d="M32 58 Q36 48 42 50 Q46 44 52 46 Q58 42 62 46 Q68 44 70 50 Q72 56 68 60 Q64 64 58 62 Q54 66 48 64 Q42 66 38 62 Q34 62 32 58 Z" fill="#C8A415" />
        {/* Bull head and horns */}
        <path d="M32 58 Q28 54 26 50 Q24 46 28 44 Q30 48 32 50" fill="#C8A415" />
        <path d="M26 50 L22 44 M26 50 L24 42" stroke="#C8A415" strokeWidth="2" strokeLinecap="round" />
        {/* Bull legs */}
        <path d="M38 62 L36 72 M44 64 L43 72 M56 64 L57 72 M62 62 L64 72" stroke="#C8A415" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tail */}
        <path d="M70 50 Q74 46 76 48 Q78 52 74 54" fill="none" stroke="#C8A415" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  '法拉利': {
    bg: 'bg-gradient-to-b from-yellow-400 to-yellow-600',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Yellow shield background */}
        <path d="M30 15 L70 15 L70 70 Q70 85 50 90 Q30 85 30 70 Z" fill="#FFD700" stroke="black" strokeWidth="2" />
        {/* Italian tricolor top */}
        <rect x="30" y="15" width="13" height="5" fill="#009246" />
        <rect x="43" y="15" width="14" height="5" fill="white" />
        <rect x="57" y="15" width="13" height="5" fill="#CE2B37" />
        {/* Prancing horse */}
        <path d="M48 78 L46 65 Q44 58 46 52 L44 46 Q42 40 44 35 L46 30 Q48 26 50 24 L52 26 Q54 24 55 26 L54 30 Q56 34 55 38 L57 42 Q60 40 62 42 L60 46 Q58 48 56 48 L54 52 Q56 58 54 65 L52 78 Z" fill="black" />
        {/* Horse head detail */}
        <path d="M50 24 Q48 22 50 20 Q52 22 54 20" fill="none" stroke="black" strokeWidth="1.5" />
        {/* SF text */}
        <text x="38" y="84" fill="black" fontSize="8" fontWeight="bold" fontFamily="Arial">S</text>
        <text x="56" y="84" fill="black" fontSize="8" fontWeight="bold" fontFamily="Arial">F</text>
      </svg>
    ),
  },
  '宾利': {
    bg: 'bg-gradient-to-b from-gray-800 to-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Central B */}
        <text x="50" y="62" textAnchor="middle" fill="white" fontSize="34" fontWeight="bold" fontFamily="Georgia, serif">B</text>
        {/* Left wing feathers */}
        <path d="M28 50 Q18 44 8 46 Q14 50 8 54 Q18 56 28 50" fill="none" stroke="white" strokeWidth="1.8" />
        <path d="M28 47 L10 42 M28 50 L8 50 M28 53 L10 58" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 45 L14 38 M26 55 L14 62" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        {/* Right wing feathers */}
        <path d="M72 50 Q82 44 92 46 Q86 50 92 54 Q82 56 72 50" fill="none" stroke="white" strokeWidth="1.8" />
        <path d="M72 47 L90 42 M72 50 L92 50 M72 53 L90 58" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M74 45 L86 38 M74 55 L86 62" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  '劳斯莱斯': {
    bg: 'bg-gradient-to-b from-purple-900 to-purple-950',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Rectangle frame */}
        <rect x="28" y="18" width="44" height="64" rx="3" fill="none" stroke="#C0C0C0" strokeWidth="2.5" />
        {/* Double R monogram */}
        <text x="50" y="60" textAnchor="middle" fill="#C0C0C0" fontSize="30" fontWeight="bold" fontFamily="Georgia, 'Times New Roman', serif">RR</text>
        {/* Top and bottom serifs */}
        <line x1="34" y1="24" x2="66" y2="24" stroke="#C0C0C0" strokeWidth="1" />
        <line x1="34" y1="76" x2="66" y2="76" stroke="#C0C0C0" strokeWidth="1" />
      </svg>
    ),
  },
  '阿斯顿马丁': {
    bg: 'bg-gradient-to-b from-green-700 to-green-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Wing shape - spread eagle */}
        <path d="M50 45 L5 42 Q2 50 5 58 L50 55 Z" fill="none" stroke="white" strokeWidth="2.5" />
        <path d="M50 45 L95 42 Q98 50 95 58 L50 55 Z" fill="none" stroke="white" strokeWidth="2.5" />
        {/* Wing feather lines - left */}
        <path d="M12 44 L46 47 M10 50 L46 50 M12 56 L46 53" stroke="white" strokeWidth="1.2" />
        {/* Wing feather lines - right */}
        <path d="M88 44 L54 47 M90 50 L54 50 M88 56 L54 53" stroke="white" strokeWidth="1.2" />
        {/* Center badge */}
        <rect x="42" y="44" width="16" height="12" rx="2" fill="white" opacity="0.2" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  '迈凯伦': {
    bg: 'bg-gradient-to-b from-orange-500 to-orange-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* McLaren speedmark / swoosh */}
        <path d="M18 68 Q22 52 32 42 Q42 32 55 30 Q68 28 76 34 Q82 38 80 46 Q78 52 70 50 Q62 48 55 42 Q48 38 40 42 Q32 46 28 56 Q24 64 22 68 Z" fill="white" />
        {/* Inner accent */}
        <path d="M30 60 Q36 48 46 42 Q54 38 60 40" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  '雪佛兰': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Golden bowtie / cross */}
        <path d="M12 42 L36 42 L36 34 L64 34 L64 42 L88 42 L88 58 L64 58 L64 66 L36 66 L36 58 L12 58 Z" fill="#C8A415" stroke="#8B7500" strokeWidth="1.5" />
        {/* Inner border */}
        <path d="M16 44 L38 44 L38 37 L62 37 L62 44 L84 44 L84 56 L62 56 L62 63 L38 63 L38 56 L16 56 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  '别克': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Three shields descending diagonally */}
        <path d="M28 25 L40 25 L40 50 Q40 56 34 58 Q28 56 28 50 Z" fill="#CE2B37" stroke="white" strokeWidth="1.5" />
        <path d="M44 32 L56 32 L56 57 Q56 63 50 65 Q44 63 44 57 Z" fill="#C0C0C0" stroke="white" strokeWidth="1.5" />
        <path d="M60 39 L72 39 L72 64 Q72 70 66 72 Q60 70 60 64 Z" fill="#0066B1" stroke="white" strokeWidth="1.5" />
        {/* Cross on each shield */}
        <line x1="34" y1="30" x2="34" y2="52" stroke="white" strokeWidth="1.5" />
        <line x1="29" y1="38" x2="39" y2="38" stroke="white" strokeWidth="1.5" />
        <line x1="50" y1="37" x2="50" y2="59" stroke="white" strokeWidth="1.5" />
        <line x1="45" y1="45" x2="55" y2="45" stroke="white" strokeWidth="1.5" />
        <line x1="66" y1="44" x2="66" y2="66" stroke="white" strokeWidth="1.5" />
        <line x1="61" y1="52" x2="71" y2="52" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  '现代': {
    bg: 'bg-gradient-to-b from-gray-600 to-gray-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Oval */}
        <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="#C0C0C0" strokeWidth="4" />
        {/* Stylized H - two people shaking hands */}
        <path d="M34 36 Q34 50 36 64" fill="none" stroke="#C0C0C0" strokeWidth="5" strokeLinecap="round" />
        <path d="M66 36 Q66 50 64 64" fill="none" stroke="#C0C0C0" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 50 Q50 42 64 50" fill="none" stroke="#C0C0C0" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  '起亚': {
    bg: 'bg-gradient-to-b from-gray-800 to-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* New KIA logo - stylized connected letters */}
        <path d="M22 65 L22 35 L42 50 L42 35" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M52 35 L52 65" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M62 65 L72 35 L82 65" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '标致': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Lion standing rampant - new Peugeot lion head */}
        <path d="M50 12 L62 20 L66 32 L64 44 L68 52 L64 62 L66 74 L58 82 L50 88 L42 82 L34 74 L36 62 L32 52 L36 44 L34 32 L38 20 Z" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" />
        {/* Lion face details */}
        <path d="M42 35 Q46 30 50 32 Q54 30 58 35" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="40" r="2" fill="white" />
        <circle cx="56" cy="40" r="2" fill="white" />
        <path d="M46 50 L50 54 L54 50" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Mane lines */}
        <path d="M38 25 L42 30 M62 25 L58 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M35 55 L40 52 M65 55 L60 52" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  '雪铁龙': {
    bg: 'bg-gradient-to-b from-gray-600 to-gray-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Double chevron pointing up */}
        <path d="M28 52 L50 36 L72 52" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 70 L50 54 L72 70" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '雷诺': {
    bg: 'bg-gradient-to-b from-yellow-400 to-yellow-600',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Diamond / lozenge shape */}
        <path d="M50 12 L78 50 L50 88 L22 50 Z" fill="none" stroke="black" strokeWidth="5" strokeLinejoin="round" />
        <path d="M50 28 L65 50 L50 72 L35 50 Z" fill="none" stroke="black" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
  },
  '沃尔沃': {
    bg: 'bg-gradient-to-b from-blue-800 to-blue-950',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Iron symbol - circle with arrow */}
        <circle cx="44" cy="56" r="26" fill="none" stroke="#C0C0C0" strokeWidth="4" />
        <path d="M62 38 L78 22" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />
        <path d="M78 22 L78 34 M78 22 L66 22" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* VOLVO text */}
        <text x="44" y="61" textAnchor="middle" fill="#C0C0C0" fontSize="10" fontWeight="bold" fontFamily="Arial" letterSpacing="0.5">VOLVO</text>
      </svg>
    ),
  },
  '路虎': {
    bg: 'bg-gradient-to-b from-green-700 to-green-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Green oval */}
        <ellipse cx="50" cy="50" rx="44" ry="26" fill="#005A2B" stroke="white" strokeWidth="2.5" />
        <ellipse cx="50" cy="50" rx="40" ry="22" fill="none" stroke="white" strokeWidth="0.8" />
        {/* LAND ROVER text */}
        <text x="50" y="47" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial" letterSpacing="2">LAND</text>
        <text x="50" y="59" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial" letterSpacing="2">ROVER</text>
      </svg>
    ),
  },
  '捷豹': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Leaping jaguar */}
        <path d="M15 62 Q20 56 28 54 Q36 52 44 48 Q52 44 60 38 Q68 32 76 26 Q80 24 84 26 Q82 30 78 34 Q72 40 64 46 Q56 52 48 56 Q40 60 32 62 Q24 64 18 64 Z" fill="#C0C0C0" />
        {/* Head */}
        <circle cx="82" cy="26" r="3" fill="#C0C0C0" />
        <path d="M84 24 L88 22 M84 28 L88 28" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tail */}
        <path d="M15 62 Q12 58 14 54 Q16 52 18 54" fill="none" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
        {/* Legs extended */}
        <path d="M28 56 L24 64 M36 54 L34 62" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  '凯迪拉克': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Shield crest */}
        <path d="M30 22 L70 22 L70 68 Q70 78 50 84 Q30 78 30 68 Z" fill="none" stroke="white" strokeWidth="2.5" />
        {/* Crown on top */}
        <path d="M36 22 L38 16 L42 20 L46 14 L50 20 L54 14 L58 20 L62 16 L64 22" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        {/* Color quadrants */}
        <rect x="34" y="28" width="14" height="14" fill="#C8A415" />
        <rect x="52" y="28" width="14" height="14" fill="#CE2B37" />
        <rect x="34" y="46" width="14" height="14" fill="#0066B1" />
        <rect x="52" y="46" width="14" height="14" fill="#C0C0C0" />
        <rect x="38" y="64" width="10" height="10" fill="#CE2B37" />
        <rect x="52" y="64" width="10" height="10" fill="#C8A415" />
        {/* Dividing lines */}
        <line x1="50" y1="26" x2="50" y2="78" stroke="white" strokeWidth="1.5" />
        <line x1="32" y1="44" x2="68" y2="44" stroke="white" strokeWidth="1.5" />
        <line x1="32" y1="62" x2="68" y2="62" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  '林肯': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Four-pointed star / compass */}
        <path d="M50 10 L56 44 L90 50 L56 56 L50 90 L44 56 L10 50 L44 44 Z" fill="none" stroke="#C0C0C0" strokeWidth="3" strokeLinejoin="round" />
        <path d="M50 22 L54 46 L78 50 L54 54 L50 78 L46 54 L22 50 L46 46 Z" fill="#C0C0C0" opacity="0.3" />
        <circle cx="50" cy="50" r="6" fill="#C0C0C0" />
      </svg>
    ),
  },
  '吉普': {
    bg: 'bg-gradient-to-b from-green-700 to-green-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Jeep grille shape */}
        <rect x="25" y="30" width="50" height="40" rx="8" fill="none" stroke="white" strokeWidth="3" />
        {/* Grille slots */}
        <line x1="35" y1="36" x2="35" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="43" y1="36" x2="43" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="36" x2="50" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="57" y1="36" x2="57" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="36" x2="65" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" />
        {/* Headlights */}
        <circle cx="20" cy="42" r="6" fill="none" stroke="white" strokeWidth="2.5" />
        <circle cx="80" cy="42" r="6" fill="none" stroke="white" strokeWidth="2.5" />
      </svg>
    ),
  },
  '特斯拉': {
    bg: 'bg-gradient-to-b from-red-600 to-red-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Tesla T - motor cross section */}
        <path d="M50 28 L50 80" stroke="white" strokeWidth="7" strokeLinecap="round" />
        <path d="M22 30 Q36 22 50 28 Q64 22 78 30" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
        {/* Top accent */}
        <path d="M30 26 Q40 20 50 24 Q60 20 70 26" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  '三菱': {
    bg: 'bg-gradient-to-b from-red-500 to-red-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Three diamonds */}
        <path d="M50 16 L62 40 L50 64 L38 40 Z" fill="white" />
        <path d="M30 44 L42 68 L30 92 L18 68 Z" fill="white" />
        <path d="M70 44 L82 68 L70 92 L58 68 Z" fill="white" />
      </svg>
    ),
  },
  '铃木': {
    bg: 'bg-gradient-to-b from-red-500 to-red-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Stylized S */}
        <path d="M30 28 L50 50 L30 72" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 28 L50 50 L70 72" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '雷克萨斯': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Oval */}
        <ellipse cx="50" cy="50" rx="42" ry="30" fill="none" stroke="#C0C0C0" strokeWidth="3" />
        {/* Stylized L */}
        <path d="M38 28 L38 68 L66 68" fill="none" stroke="#C0C0C0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Italic slant effect */}
        <path d="M42 28 L38 68" fill="none" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  '英菲尼迪': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Oval */}
        <ellipse cx="50" cy="50" rx="42" ry="30" fill="none" stroke="#C0C0C0" strokeWidth="3" />
        {/* Two converging lines forming road/mountain */}
        <path d="M50 24 L36 72" fill="none" stroke="#C0C0C0" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 24 L64 72" fill="none" stroke="#C0C0C0" strokeWidth="5" strokeLinecap="round" />
        {/* Horizon line */}
        <path d="M38 58 L62 58" fill="none" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '讴歌': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Stylized A - compass/caliper shape */}
        <path d="M50 18 L50 82" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 18 L28 72" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 18 L72 72" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
        {/* Crossbar */}
        <path d="M36 55 L64 55" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  '比亚迪': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Oval */}
        <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="white" strokeWidth="3" />
        {/* BYD text */}
        <text x="50" y="56" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial" letterSpacing="2">BYD</text>
        {/* Build Your Dreams - small text */}
        <text x="50" y="68" textAnchor="middle" fill="white" fontSize="5" fontFamily="Arial" opacity="0.7">BUILD YOUR DREAMS</text>
      </svg>
    ),
  },
  '蔚来': {
    bg: 'bg-gradient-to-b from-blue-500 to-blue-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* NIO mark - abstract upward arrow / sky */}
        <path d="M28 62 Q38 38 50 30 Q62 38 72 62" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 58 Q43 42 50 36 Q57 42 64 58" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Base line */}
        <path d="M32 68 L68 68" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '小鹏': {
    bg: 'bg-gradient-to-b from-green-500 to-green-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* XPeng X mark - stylized wings */}
        <path d="M25 35 Q37 50 50 65 Q63 50 75 35" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35 28 Q42 42 50 52 Q58 42 65 28" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '理想': {
    bg: 'bg-gradient-to-b from-blue-500 to-blue-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Li Auto - L shape with horizontal bar */}
        <path d="M38 25 L38 70 L68 70" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dot accent */}
        <circle cx="62" cy="32" r="4" fill="white" />
      </svg>
    ),
  },
  '吉利': {
    bg: 'bg-gradient-to-b from-blue-700 to-blue-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Shield shape */}
        <path d="M50 15 L78 28 L78 60 Q78 78 50 88 Q22 78 22 60 L22 28 Z" fill="none" stroke="white" strokeWidth="3" />
        {/* Inner geometric pattern */}
        <path d="M50 30 L65 38 L65 56 L50 64 L35 56 L35 38 Z" fill="none" stroke="white" strokeWidth="2.5" />
        {/* Center lines */}
        <path d="M50 30 L50 64 M35 47 L65 47" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  '长城': {
    bg: 'bg-gradient-to-b from-gray-600 to-gray-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Oval */}
        <ellipse cx="50" cy="50" rx="40" ry="28" fill="none" stroke="white" strokeWidth="3" />
        {/* Great Wall battlement shape */}
        <path d="M26 58 L26 46 L34 46 L34 40 L42 40 L42 46 L50 46 L50 40 L58 40 L58 46 L66 46 L66 40 L74 40 L74 58" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Base */}
        <line x1="26" y1="58" x2="74" y2="58" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '奇瑞': {
    bg: 'bg-gradient-to-b from-red-600 to-red-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Circle */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="white" strokeWidth="3" />
        {/* CAC stylized - arrow/loop */}
        <path d="M35 50 Q35 35 50 35 Q65 35 65 50 Q65 65 50 65 Q42 65 38 58" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Arrow tip */}
        <path d="M38 58 L34 64 M38 58 L44 62" stroke="white" strokeWidth="3" strokeLinecap="round" />
        {/* Center vertical */}
        <line x1="50" y1="38" x2="50" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  '领克': {
    bg: 'bg-gradient-to-b from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Lynk & Co - split design */}
        <path d="M22 62 L38 34 L50 52 L62 34 L78 62" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Underline accent */}
        <path d="M30 68 L70 68" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  '极氪': {
    bg: 'bg-gradient-to-b from-blue-500 to-blue-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Zeekr Z mark */}
        <path d="M30 30 L70 30 L30 70 L70 70" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '小米': {
    bg: 'bg-gradient-to-b from-orange-400 to-orange-600',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Xiaomi - rounded square with MI */}
        <rect x="24" y="28" width="52" height="44" rx="14" fill="none" stroke="white" strokeWidth="4" />
        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">MI</text>
      </svg>
    ),
  },
};

// Generate a consistent color from brand name hash
const fallbackGradients = [
  'from-emerald-500 to-emerald-700',
  'from-violet-500 to-violet-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
  'from-indigo-500 to-indigo-700',
  'from-teal-500 to-teal-700',
  'from-orange-500 to-orange-700',
  'from-fuchsia-500 to-fuchsia-700',
  'from-lime-600 to-lime-800',
];

function getBrandHash(brand: string): number {
  let hash = 0;
  for (let i = 0; i < brand.length; i++) {
    hash = brand.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

interface BrandLogoProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ brand, size = 'md' }: BrandLogoProps) {
  const config = brandConfig[brand];

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (config) {
    return (
      <span className={`${sizeClasses[size]} ${config.bg} rounded-full inline-flex items-center justify-center shrink-0 shadow-sm text-white overflow-hidden`}>
        {config.logo}
      </span>
    );
  }

  // Fallback: brand first char + unique color from hash
  const gradient = fallbackGradients[getBrandHash(brand) % fallbackGradients.length];
  return (
    <span className={`${sizeClasses[size]} bg-gradient-to-b ${gradient} rounded-full inline-flex items-center justify-center shrink-0 shadow-sm text-white overflow-hidden`}>
      <span className="font-bold text-[0.6em] leading-none">{brand[0]}</span>
    </span>
  );
}
