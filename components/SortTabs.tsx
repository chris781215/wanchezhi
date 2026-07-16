'use client';

import { SortType } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';

// Inline SVG icons
const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.24 17 7.5c.5 1.5.5 3-.5 4.5 1-.5 2-1 2.5-2.5.5 2-.5 4-1.5 5.5a5 5 0 01-2 4.5z" />
  </svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

type IconComponent = ({ className }: { className?: string }) => React.ReactElement;
const sortOptions: { value: SortType; label: string; icon: IconComponent }[] = [
  { value: 'hot', label: 'Hot', icon: FlameIcon },
  { value: 'new', label: 'New', icon: ClockIcon },
  { value: 'top', label: 'Top', icon: TrophyIcon },
];

export default function SortTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = (searchParams.get('sort') as SortType) || 'hot';

  const handleSort = (value: SortType) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2">
      <div className="flex items-center gap-1">
        {sortOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleSort(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === value
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-secondary'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
