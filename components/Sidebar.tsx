'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { mockCommunities } from '@/lib/mock-data';
import BrandLogo from '@/components/BrandLogo';

// Inline SVG icons
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const TrendingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const CompassIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const hotCommunities = [...mockCommunities].sort((a, b) => b.memberCount - a.memberCount).slice(0, 5);

  const handleHomeClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-16 space-y-4">
        <nav className="space-y-1">
          {/* Main navigation */}
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium"
            onClick={handleHomeClick}
          >
            <HomeIcon className="w-5 h-5" />
            <span>首页</span>
          </Link>
          <Link
            href="/?sort=hot"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium"
          >
            <TrendingIcon className="w-5 h-5" />
            <span>热门</span>
          </Link>
          <Link
            href="/?sort=new"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium"
          >
            <CompassIcon className="w-5 h-5" />
            <span>最新</span>
          </Link>
        </nav>

        {/* Hot communities */}
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-primary text-white">
            <h3 className="font-semibold text-sm">热门社区</h3>
          </div>
          <div className="divide-y divide-border">
            {hotCommunities.map((comm) => (
              <Link
                key={comm.id}
                href={`/w/${comm.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors"
              >
                <BrandLogo brand={comm.brand} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">w/{comm.displayName}</p>
                  <p className="text-xs text-text-secondary">{comm.memberCount} 成员</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
