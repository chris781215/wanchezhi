// Brand logo component - English full name text logos

// Chinese → English brand name mapping
const brandEnglishNames: Record<string, string> = {
  '奔驰': 'Benz',
  '宝马': 'BMW',
  '奥迪': 'Audi',
  '大众': 'VW',
  '丰田': 'Toyota',
  '本田': 'Honda',
  '日产': 'Nissan',
  '马自达': 'Mazda',
  '保时捷': 'Porsche',
  '斯巴鲁': 'Subaru',
  '福特': 'Ford',
  '玛莎拉蒂': 'Maserati',
  '兰博基尼': 'Lamborghini',
  '法拉利': 'Ferrari',
  '宾利': 'Bentley',
  '劳斯莱斯': 'Rolls-Royce',
  '阿斯顿马丁': 'Aston Martin',
  '迈凯伦': 'McLaren',
  '雪佛兰': 'Chevrolet',
  '别克': 'Buick',
  '现代': 'Hyundai',
  '起亚': 'Kia',
  '标致': 'Peugeot',
  '雪铁龙': 'Citroën',
  '雷诺': 'Renault',
  '沃尔沃': 'Volvo',
  '路虎': 'Land Rover',
  '捷豹': 'Jaguar',
  '凯迪拉克': 'Cadillac',
  '林肯': 'Lincoln',
  '吉普': 'Jeep',
  '特斯拉': 'Tesla',
  '三菱': 'Mitsubishi',
  '铃木': 'Suzuki',
  '雷克萨斯': 'Lexus',
  '英菲尼迪': 'Infiniti',
  '讴歌': 'Acura',
  '比亚迪': 'BYD',
  '蔚来': 'NIO',
  '小鹏': 'XPeng',
  '理想': 'Li Auto',
  '吉利': 'Geely',
  '长城': 'Great Wall',
  '奇瑞': 'Chery',
  '领克': 'Lynk & Co',
  '极氪': 'Zeekr',
  '小米': 'Xiaomi',
};

// Brand-specific background gradients
const brandBg: Record<string, string> = {
  '奔驰': 'from-gray-800 to-black',
  '宝马': 'from-black to-gray-900',
  '奥迪': 'from-gray-600 to-gray-900',
  '大众': 'from-blue-500 to-blue-800',
  '丰田': 'from-red-500 to-red-700',
  '本田': 'from-red-600 to-red-800',
  '日产': 'from-gray-700 to-gray-900',
  '马自达': 'from-blue-600 to-blue-900',
  '保时捷': 'from-amber-600 to-amber-800',
  '斯巴鲁': 'from-blue-500 to-blue-800',
  '福特': 'from-blue-600 to-blue-900',
  '玛莎拉蒂': 'from-blue-800 to-blue-950',
  '兰博基尼': 'from-yellow-500 to-yellow-700',
  '法拉利': 'from-red-500 to-red-700',
  '宾利': 'from-gray-800 to-black',
  '劳斯莱斯': 'from-purple-900 to-purple-950',
  '阿斯顿马丁': 'from-green-700 to-green-900',
  '迈凯伦': 'from-orange-500 to-orange-700',
  '雪佛兰': 'from-gray-700 to-gray-900',
  '别克': 'from-gray-700 to-gray-900',
  '现代': 'from-gray-600 to-gray-800',
  '起亚': 'from-gray-800 to-black',
  '标致': 'from-gray-700 to-gray-900',
  '雪铁龙': 'from-gray-600 to-gray-800',
  '雷诺': 'from-yellow-400 to-yellow-600',
  '沃尔沃': 'from-blue-800 to-blue-950',
  '路虎': 'from-green-700 to-green-900',
  '捷豹': 'from-gray-700 to-gray-900',
  '凯迪拉克': 'from-gray-700 to-gray-900',
  '林肯': 'from-gray-700 to-gray-900',
  '吉普': 'from-green-700 to-green-900',
  '特斯拉': 'from-red-600 to-red-800',
  '三菱': 'from-red-500 to-red-700',
  '铃木': 'from-red-500 to-red-700',
  '雷克萨斯': 'from-gray-700 to-gray-900',
  '英菲尼迪': 'from-gray-700 to-gray-900',
  '讴歌': 'from-gray-700 to-gray-900',
  '比亚迪': 'from-gray-700 to-gray-900',
  '蔚来': 'from-blue-500 to-blue-700',
  '小鹏': 'from-green-500 to-green-700',
  '理想': 'from-blue-500 to-blue-700',
  '吉利': 'from-blue-700 to-blue-900',
  '长城': 'from-gray-600 to-gray-800',
  '奇瑞': 'from-red-600 to-red-800',
  '领克': 'from-gray-700 to-gray-900',
  '极氪': 'from-blue-500 to-blue-700',
  '小米': 'from-orange-400 to-orange-600',
};

// Fallback gradients for unknown brands
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

// Determine font size based on text length
function getFontSize(name: string, size: 'sm' | 'md' | 'lg' | 'xl'): string {
  const len = name.length;
  const base = size === 'sm' ? 8 : size === 'md' ? 10 : size === 'lg' ? 13 : 18;
  if (len <= 3) return `${base + 2}px`;
  if (len <= 5) return `${base + 1}px`;
  if (len <= 8) return `${base}px`;
  if (len <= 12) return `${base - 1}px`;
  return `${base - 2}px`;
}

// Determine width based on text length (height stays fixed per size)
function getWidthClass(name: string, size: 'sm' | 'md' | 'lg' | 'xl'): string {
  const len = name.length;
  const sizeMap = {
    sm: { base: 'w-8', short: 'w-10', medium: 'w-14', long: 'w-18', xl: 'w-22' },
    md: { base: 'w-12', short: 'w-14', medium: 'w-18', long: 'w-22', xl: 'w-28' },
    lg: { base: 'w-16', short: 'w-18', medium: 'w-22', long: 'w-28', xl: 'w-32' },
    xl: { base: 'w-24', short: 'w-28', medium: 'w-32', long: 'w-36', xl: 'w-44' },
  };
  const tiers = sizeMap[size];
  if (len <= 3) return tiers.short;
  if (len <= 6) return tiers.base;
  if (len <= 9) return tiers.medium;
  if (len <= 13) return tiers.long;
  return tiers.xl;
}

interface BrandLogoProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  image?: string; // Custom logo image URL
}

export default function BrandLogo({ brand, size = 'md', image }: BrandLogoProps) {
  const englishName = brandEnglishNames[brand] || brand;
  const gradient = brandBg[brand];

  const heightClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const bgClass = gradient || fallbackGradients[getBrandHash(brand) % fallbackGradients.length];
  const fontSize = getFontSize(englishName, size);
  const widthClass = getWidthClass(englishName, size);

  // If custom image is provided, show it
  if (image) {
    return (
      <span
        className={`${widthClass} ${heightClasses[size]} rounded-full inline-flex items-center justify-center shrink-0 overflow-hidden bg-secondary`}
      >
        <img src={image} alt={brand} className="w-full h-full object-cover" />
      </span>
    );
  }

  return (
    <span
      className={`${widthClass} ${heightClasses[size]} bg-gradient-to-b ${bgClass} rounded-full inline-flex items-center justify-center shrink-0 text-white overflow-hidden`}
      title={englishName}
    >
      <span
        className="font-bold leading-none text-center px-1 whitespace-nowrap"
        style={{ fontSize }}
      >
        {englishName}
      </span>
    </span>
  );
}
