'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function MobileTabBar() {
  const { user } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around h-14">
        <a href="/" className="flex flex-col items-center gap-0.5 text-text-secondary">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px]">首页</span>
        </a>
        <a href="/?sort=hot" className="flex flex-col items-center gap-0.5 text-text-secondary">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-[10px]">热门</span>
        </a>
        <a href="/submit" className="flex flex-col items-center gap-0.5 text-primary">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center -mt-2 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-[10px]">发帖</span>
        </a>
        <Link
          href={user ? `/u/${user.username}` : '/auth/login'}
          className="flex flex-col items-center gap-0.5 text-text-secondary"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px]">我的</span>
        </Link>
      </div>
    </nav>
  );
}
