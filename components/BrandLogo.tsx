// Brand logo component - real car brand SVG logos
// Each brand uses its signature colors and recognizable mark

import type { ReactNode } from 'react';

const brandConfig: Record<string, { bg: string; logo: ReactNode }> = {
  '奔驰': {
    bg: 'bg-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="4" />
        <line x1="50" y1="4" x2="50" y2="50" stroke="white" strokeWidth="4" />
        <line x1="50" y1="50" x2="10" y2="73" stroke="white" strokeWidth="4" />
        <line x1="50" y1="50" x2="90" y2="73" stroke="white" strokeWidth="4" />
      </svg>
    ),
  },
  '宝马': {
    bg: 'bg-black',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="white" strokeWidth="2" />
        <path d="M50 14 A36 36 0 0 1 86 50 L50 50 Z" fill="#0066B1" />
        <path d="M50 14 A36 36 0 0 0 14 50 L50 50 Z" fill="white" />
        <path d="M50 86 A36 36 0 0 1 14 50 L50 50 Z" fill="#0066B1" />
        <path d="M50 86 A36 36 0 0 0 86 50 L50 50 Z" fill="white" />
      </svg>
    ),
  },
  '奥迪': {
    bg: 'bg-gradient-to-br from-gray-700 to-gray-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="22" cy="50" r="16" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="42" cy="50" r="16" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="62" cy="50" r="16" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="82" cy="50" r="16" fill="none" stroke="white" strokeWidth="4" />
      </svg>
    ),
  },
  '大众': {
    bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="4" />
        <path d="M22 30 L38 72 L50 48 L62 72 L78 30" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '丰田': {
    bg: 'bg-gradient-to-br from-red-500 to-red-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="30" fill="none" stroke="white" strokeWidth="4" />
        <ellipse cx="50" cy="38" rx="26" ry="14" fill="none" stroke="white" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="12" ry="30" fill="none" stroke="white" strokeWidth="4" />
      </svg>
    ),
  },
  '本田': {
    bg: 'bg-gradient-to-br from-red-600 to-red-800',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="10" y="10" width="80" height="80" rx="14" fill="none" stroke="white" strokeWidth="5" />
        <path d="M32 28 L32 72 M68 28 L68 72 M32 52 L68 52" stroke="white" strokeWidth="7" strokeLinecap="round" />
      </svg>
    ),
  },
  '日产': {
    bg: 'bg-gradient-to-br from-red-500 to-red-600',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="4" />
        <rect x="10" y="40" width="80" height="20" rx="2" fill="white" opacity="0.15" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="white" strokeWidth="3" />
        <text x="50" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">NISSAN</text>
      </svg>
    ),
  },
  '马自达': {
    bg: 'bg-gradient-to-br from-blue-600 to-blue-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="30" fill="none" stroke="white" strokeWidth="4" />
        <path d="M25 58 Q35 35 50 35 Q65 35 75 58" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M35 50 Q42 42 50 42 Q58 42 65 50" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  '保时捷': {
    bg: 'bg-gradient-to-br from-red-700 to-red-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M20 18 L80 18 L88 30 L88 82 L20 82 L12 70 L12 30 Z" fill="none" stroke="white" strokeWidth="3" />
        <path d="M20 18 L80 18 L88 30 L88 82 L20 82 L12 70 L12 30 Z" fill="white" opacity="0.1" />
        <path d="M30 42 Q38 34 44 40 Q50 46 56 40 Q62 34 70 42" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="42" x2="50" y2="68" stroke="white" strokeWidth="3" />
        <path d="M30 56 L44 56 M56 56 L70 56" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  '斯巴鲁': {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="30" fill="none" stroke="white" strokeWidth="3" />
        <circle cx="50" cy="28" r="5" fill="white" />
        <circle cx="34" cy="38" r="4" fill="white" />
        <circle cx="66" cy="38" r="4" fill="white" />
        <circle cx="24" cy="52" r="3.5" fill="white" />
        <circle cx="42" cy="48" r="3.5" fill="white" />
        <circle cx="58" cy="48" r="3.5" fill="white" />
        <circle cx="76" cy="52" r="3.5" fill="white" />
      </svg>
    ),
  },
  '福特': {
    bg: 'bg-gradient-to-br from-blue-700 to-blue-900',
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="30" fill="none" stroke="white" strokeWidth="4" />
        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontStyle="italic" fontFamily="Georgia, serif">Ford</text>
      </svg>
    ),
  },
};

interface BrandLogoProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ brand, size = 'md' }: BrandLogoProps) {
  const config = brandConfig[brand] || {
    bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
    logo: <span className="font-bold text-sm">{brand[0]}</span>,
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <span className={`${sizeClasses[size]} ${config.bg} rounded-full inline-flex items-center justify-center shrink-0 shadow-sm text-white overflow-hidden`}>
      {config.logo}
    </span>
  );
}
