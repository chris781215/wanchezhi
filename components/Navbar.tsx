'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockPosts, mockUsers } from '@/lib/mock-data';
import { useRouter, usePathname } from 'next/navigation';
import Avatar from '@/components/Avatar';
import BrandLogo from '@/components/BrandLogo';
import { getBadgeLevel } from '@/lib/utils';

// Inline SVG icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const PenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const DraftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [draftCount, setDraftCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const [allCommunities, setAllCommunities] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch communities from API (includes dynamic ones)
  useEffect(() => {
    fetch('/api/communities')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAllCommunities(data.data.items);
      })
      .catch(() => {});
  }, []);

  // Read draft count from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('wcz-drafts');
      setDraftCount(raw ? JSON.parse(raw).length : 0);
    } catch {
      setDraftCount(0);
    }
    // Read unread notifications
    try {
      const raw = localStorage.getItem('wcz-notifications');
      if (raw) {
        const notifs = JSON.parse(raw);
        setNotifCount(notifs.filter((n: { read: boolean }) => !n.read).length);
      }
    } catch {
      setNotifCount(0);
    }
  }, []);

  // Search across communities, posts, and users
  const q = searchQuery.toLowerCase();
  const filteredCommunities = searchQuery.trim()
    ? allCommunities.filter(
        (c: any) =>
          c.displayName.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];
  const filteredPosts = searchQuery.trim()
    ? mockPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.content || '').toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const filteredUsers = searchQuery.trim()
    ? mockUsers.filter(
        (u) =>
          u.nickname.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const hasResults = filteredCommunities.length > 0 || filteredPosts.length > 0 || filteredUsers.length > 0;

  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCommunity = (slug: string) => {
    setSearchQuery('');
    setSearchFocused(false);
    setSearchOpen(false);
    router.push(`/w/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 ml-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="玩车志" className="h-8 w-auto" />
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl" ref={searchRef}>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索社区、帖子、用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {hasResults ? (
                  <>
                    {filteredCommunities.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">社区</p>
                        {filteredCommunities.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCommunity(c.slug)}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary flex items-center gap-3 border-b border-border last:border-0"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">{c.brand[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">w/{c.displayName}</p>
                              <p className="text-xs text-text-secondary">{(c.description || '').slice(0, 40)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredPosts.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">帖子</p>
                        {filteredPosts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false); setSearchOpen(false); router.push(`/w/${p.community?.slug || 'all'}/post/${p.id}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary border-b border-border last:border-0"
                          >
                            <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              {p.community ? `w/${p.community.displayName}` : ''} · {p.author?.nickname} · {p.voteScore} 赞
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredUsers.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">用户</p>
                        {filteredUsers.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false); setSearchOpen(false); router.push(`/u/${u.username}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary flex items-center gap-3 border-b border-border last:border-0"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">{u.nickname[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{u.nickname}</p>
                              <p className="text-xs text-text-secondary">{u.points} 积分</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-text-secondary mb-2">没有找到匹配结果</p>
                    <Link
                      href={`/communities/create`}
                      className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                      onClick={() => { setSearchFocused(false); setSearchQuery(''); }}
                    >
                      + 创建新社区
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {draftCount > 0 && (
            <Link
              href="/submit"
              className="relative flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-foreground border border-border rounded-full transition-colors"
            >
              <DraftIcon className="w-4 h-4" />
              <span>草稿</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{draftCount}</span>
            </Link>
          )}
          <Link
            href="/submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <PenIcon className="w-4 h-4" />
            <span>发帖</span>
          </Link>
          <Link
            href="/communities/create"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-foreground border border-border rounded-full transition-colors"
          >
            <span>+</span>
            <span>社区</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/notifications"
                className="relative p-2 rounded-full hover:bg-secondary"
              >
                <BellIcon className="w-5 h-5 text-text-secondary" />
                {notifCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {notifCount > 9 ? '9+' : notifCount}
                  </span>
                )}
              </Link>
              <Link
                href={`/u/${user.username}`}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                <Avatar nickname={user.nickname} points={user.points} size="sm" />
                <span>{user.nickname}</span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 text-sm text-text-secondary hover:text-foreground transition-colors"
              >
                退出
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>登录</span>
            </Link>
          )}
        </div>

        {/* Mobile: Search toggle + Drafts + Menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => { setSearchOpen((v) => !v); setMobileMenuOpen(false); }}
            className="p-2 rounded-full hover:bg-secondary"
          >
            {searchOpen ? <XIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
          </button>
          {draftCount > 0 && (
            <Link href="/submit" className="relative p-2 rounded-full hover:bg-secondary">
              <DraftIcon className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center">{draftCount}</span>
            </Link>
          )}
          <button
            onClick={() => { if (pathname === '/submit') { router.back(); } else { setSearchOpen(false); setMobileMenuOpen(false); router.push('/submit'); } }}
            className="p-2 rounded-full hover:bg-secondary"
          >
            {pathname === '/submit' ? <XIcon className="w-5 h-5" /> : <PenIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => { setMobileMenuOpen((v) => !v); setSearchOpen(false); }}
            className="p-2 rounded-full hover:bg-secondary"
          >
            {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-3 pb-3 relative" ref={searchRef}>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索社区、帖子、用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-full text-sm focus:outline-none focus:border-primary"
              autoFocus
            />
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {hasResults ? (
                  <>
                    {filteredCommunities.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">社区</p>
                        {filteredCommunities.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCommunity(c.slug)}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary flex items-center gap-3 border-b border-border last:border-0"
                          >
                            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">{c.brand[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">w/{c.displayName}</p>
                              <p className="text-xs text-text-secondary">{(c.description || '').slice(0, 30)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredPosts.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">帖子</p>
                        {filteredPosts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false); setSearchOpen(false); router.push(`/w/${p.community?.slug || 'all'}/post/${p.id}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary border-b border-border last:border-0"
                          >
                            <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{p.author?.nickname}</p>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredUsers.length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-secondary">用户</p>
                        {filteredUsers.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false); setSearchOpen(false); router.push(`/u/${u.username}`); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-secondary flex items-center gap-3 border-b border-border last:border-0"
                          >
                            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">{u.nickname[0]}</span>
                            </div>
                            <p className="text-sm font-medium">{u.nickname}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-text-secondary mb-2">没有找到匹配结果</p>
                    <Link
                      href="/communities/create"
                      className="text-sm text-primary font-medium hover:underline"
                      onClick={() => { setSearchFocused(false); setSearchQuery(''); setSearchOpen(false); }}
                    >
                      + 创建新社区
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 right-3 w-64 max-h-[60vh] overflow-y-auto bg-white border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            {user ? (
              <>
                {/* User card */}
                <Link
                  href={`/u/${user.username}`}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Avatar nickname={user.nickname} points={user.points} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{user.nickname}</p>
                    <p className="text-[11px] text-text-secondary">{user.points} 积分</p>
                  </div>
                </Link>

                {/* Quick links */}
                <div className="border-t border-border mt-1 pt-1 space-y-0.5">
                  <Link
                    href={`/u/${user.username}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DraftIcon className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">我的帖子</span>
                  </Link>
                  <Link
                    href={`/u/${user.username}?tab=bookmarks`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookmarkIcon className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">我的收藏</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BellIcon className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">消息通知</span>
                  </Link>
                  <Link
                    href={`/u/${user.username}?tab=settings`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SettingsIcon className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">个人设置</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary w-full text-left text-red-500"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm">退出登录</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserIcon className="w-5 h-5" />
                <span className="text-sm">登录 / 注册</span>
              </Link>
            )}
          </div>

          {/* Hot communities */}
          <div className="border-t border-border">
            <div className="px-3 py-2 bg-primary text-white">
              <h3 className="font-semibold text-xs">热门社区</h3>
            </div>
            {[...allCommunities]
              .sort((a: any, b: any) => b.memberCount - a.memberCount)
              .slice(0, 5)
              .map((comm: any) => (
                <Link
                  key={comm.id}
                  href={`/w/${comm.slug}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-secondary transition-colors border-b border-border last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BrandLogo brand={comm.brand} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">w/{comm.displayName}</p>
                    <p className="text-[11px] text-text-secondary">{comm.memberCount} 成员</p>
                  </div>
                </Link>
              ))}
          </div>

          {/* Senior users */}
          <div className="border-t border-border">
            <div className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <h3 className="font-semibold text-xs">🏆 资深用户</h3>
            </div>
            {[...mockUsers]
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((u, idx) => {
                const badge = getBadgeLevel(u.points);
                return (
                  <Link
                    key={u.id}
                    href={`/u/${u.username}`}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-secondary transition-colors border-b border-border last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative shrink-0">
                      <Avatar nickname={u.nickname} points={u.points} size="sm" />
                      {idx < 3 && (
                        <span className="absolute -top-1 -left-1 text-[10px]">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{u.nickname}</p>
                      <p className="text-[11px] text-text-secondary">{badge.current.icon} {u.points} 积分</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </header>
  );
}
