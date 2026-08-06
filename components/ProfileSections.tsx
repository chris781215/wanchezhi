'use client';

import { useState, useEffect } from 'react';

const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const HistoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface ProfileSectionsProps {
  userId: string;
  username: string;
  nickname: string;
}

type SectionKey = 'currentCar' | 'carHistory' | 'expertise' | 'interests';

const sectionDefs = [
  { key: 'currentCar' as SectionKey, label: '正在玩的车', icon: <CarIcon className="w-4 h-4" /> },
  { key: 'carHistory' as SectionKey, label: '玩过的车', icon: <HistoryIcon className="w-4 h-4" /> },
  { key: 'expertise' as SectionKey, label: '想玩的车', icon: <CarIcon className="w-4 h-4" /> },
  { key: 'interests' as SectionKey, label: '兴趣爱好', icon: <HeartIcon className="w-4 h-4" /> },
];

export default function ProfileSections({ username }: ProfileSectionsProps) {
  const [values, setValues] = useState<Record<SectionKey, string>>({
    currentCar: '',
    carHistory: '',
    expertise: '',
    interests: '',
  });
  const [loaded, setLoaded] = useState(false);

  // Fetch user data from API
  useEffect(() => {
    fetch(`/api/users/${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setValues({
            currentCar: data.data.currentCar || '',
            carHistory: data.data.carHistory || '',
            expertise: data.data.expertise || '',
            interests: data.data.interests || '',
          });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [username]);

  if (!loaded) return null;

  // Only show sections that have data
  const hasAnyData = Object.values(values).some(v => v.trim());
  if (!hasAnyData) return null;

  return (
    <div className="space-y-3">
      {sectionDefs.map(({ key, label, icon }) => {
        const value = values[key];
        if (!value) return null;

        return (
          <div key={key} className="bg-white border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary mb-1.5">
              {icon}
              <span>{label}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
