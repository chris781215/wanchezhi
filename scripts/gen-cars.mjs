import { writeFileSync } from 'fs';
import { join } from 'path';

const dir = join(process.cwd(), 'public/cars');

const palettes = [
  ['#1a1a2e', '#16213e', '#0f3460'],
  ['#2d132c', '#801336', '#c72c41'],
  ['#0c0032', '#190061', '#240090'],
  ['#1b1b2f', '#162447', '#1f4068'],
  ['#2c003e', '#512b58', '#8174ab'],
  ['#0d1117', '#161b22', '#21262d'],
  ['#1a0000', '#4a0000', '#8b0000'],
  ['#001510', '#00382e', '#00695c'],
  ['#1c1c1c', '#2d2d2d', '#4a4a4a'],
  ['#0a1628', '#1a3a5c', '#2980b9'],
];

const carPath = 'M80,140 L100,140 L110,120 L140,105 L180,100 L220,100 L260,105 L290,115 L310,120 L320,140 L340,140 L340,155 L320,155 L310,155 A20,20 0 1,1 270,155 L150,155 A20,20 0 1,1 110,155 L80,155 Z';

const ratios = [
  { name: '4x3', w: 800, h: 600 },
  { name: '3x4', w: 600, h: 800 },
  { name: '16x9', w: 1200, h: 675 },
  { name: '9x16', w: 450, h: 800 },
];

const labels = [
  'BMW E46', 'Benz W221', 'Porsche 911', 'Audi A4', 'Golf GTI',
  'Supra JZA80', 'GT-R R35', 'Civic Type R', 'MX-5', 'BRZ',
  'M3 CSL', 'AMG C63', 'RS4 Avant', 'STI WRX', 'RX-7 FD',
  'Skyline R34', 'NSX NA1', 'Corvette C6', 'Mustang GT', 'Camaro SS'
];

for (let i = 0; i < 20; i++) {
  const ratio = ratios[i % 4];
  const palette = palettes[i % 10];
  const label = labels[i];
  const { w, h } = ratio;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette[0]}"/>
      <stop offset="50%" style="stop-color:${palette[1]}"/>
      <stop offset="100%" style="stop-color:${palette[2]}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.15)"/>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h * 0.4}" fill="url(#shine)"/>
  <g transform="translate(${w/2 - 210}, ${h/2 - 60}) scale(${Math.min(w/500, h/300)})">
    <path d="${carPath}" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    <circle cx="130" cy="155" r="18" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
    <circle cx="290" cy="155" r="18" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
  </g>
  <text x="${w/2}" y="${h - 40}" font-family="Arial, sans-serif" font-size="${Math.max(14, w/40)}" fill="rgba(255,255,255,0.6)" text-anchor="middle" font-weight="bold">${label}</text>
  <text x="${w/2}" y="${h - 16}" font-family="Arial, sans-serif" font-size="${Math.max(10, w/60)}" fill="rgba(255,255,255,0.35)" text-anchor="middle">${ratio.name} · 玩车志</text>
</svg>`;

  writeFileSync(join(dir, `car-${String(i+1).padStart(2,'0')}-${ratio.name}.svg`), svg);
}
console.log('Generated 20 car images in public/cars/');
