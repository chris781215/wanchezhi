import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { BADGE_LEVELS } from '@/types';

// Format date to relative time
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
}

// Hot ranking algorithm (similar to Reddit's Hot algorithm)
export function calculateHotScore(upvotes: number, downvotes: number, date: Date): number {
  const score = upvotes - downvotes;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  const seconds = date.getTime() / 1000 - 1134028003; // Reddit epoch
  return sign * order + seconds / 45000;
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate slug from brand and code
export function generateSlug(brand: string, code: string): string {
  return `${brand}_${code}`;
}

// Format number (1000 -> 1k)
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// Calculate badge level based on points
export function getBadgeLevel(points: number) {
  const levels = [...BADGE_LEVELS];

  let current = levels[0];
  let next = levels[1] ?? null;

  for (let i = 0; i < levels.length; i++) {
    if (points >= levels[i].minPoints) {
      current = levels[i];
      next = levels[i + 1] ?? null;
    }
  }

  return {
    current,
    next,
    progress: next ? ((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100 : 100,
  };
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// Share via Web Share API
export async function share(data: { title?: string; text?: string; url?: string }): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
