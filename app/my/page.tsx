'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getBadgeLevel, formatNumber, formatRelativeTime } from '@/lib/utils';
import { BADGE_LEVELS, Post, Comment } from '@/types';
import Avatar from '@/components/Avatar';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

// Icons
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
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
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

type SectionKey = 'currentCar' | 'carHistory' | 'expertise' | 'interests';

const sectionDefs = [
  { key: 'currentCar' as SectionKey, label: '正在玩的车', icon: <CarIcon className="w-4 h-4" />, placeholder: '写下你现在的座驾吧，写明车型、年款、入手时间\n比如：2008 奔驰 S350 W221，2024年3月入手，日常代步 + 周末跑山' },
  { key: 'carHistory' as SectionKey, label: '玩过的车', icon: <HistoryIcon className="w-4 h-4" />, placeholder: '写下你玩过的车，写明车型、年款、使用时间\n比如：E46 325i（2020-2023）→ E90 330i（2023-2024）→ 现在这台' },
  { key: 'expertise' as SectionKey, label: '想玩的车', icon: <CarIcon className="w-4 h-4" />, placeholder: '写下你想玩的车，写明车型、年款\n比如：E46 M3、R34 GT-R、W221 S600、997 Turbo...' },
  { key: 'interests' as SectionKey, label: '兴趣爱好', icon: <HeartIcon className="w-4 h-4" />, placeholder: '除了车，你还喜欢什么？\n比如：赛道日、自驾游、摄影、模型收藏...' },
];

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'bookmarks'>('posts');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Profile editing state
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState('');
  const [savingBio, setSavingBio] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Profile sections editing
  const [sectionValues, setSectionValues] = useState<Record<SectionKey, string>>({ currentCar: '', carHistory: '', expertise: '', interests: '' });
  const [editingSection, setEditingSection] = useState<SectionKey | null>(null);
  const [editSectionValue, setEditSectionValue] = useState('');
  const [savingSection, setSavingSection] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch user data
  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json()),
      fetch(`/api/users/${encodeURIComponent(user.username)}`).then(r => r.json()),
    ]).then(([postsRes, commentsRes, userRes]) => {
      const posts: Post[] = (postsRes.data?.items || postsRes.data || []).map((p: any) => ({
        ...p, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt),
      }));
      setAllPosts(posts);
      setUserPosts(posts.filter(p => p.authorId === user.id));

      const comments: Comment[] = (commentsRes.data?.items || commentsRes.data || []).map((c: any) => ({
        ...c, createdAt: new Date(c.createdAt),
      }));
      setUserComments(comments.filter((c: any) => c.authorId === user.id));

      const userData = userRes.data;
      if (userData) {
        setBio(userData.bio || '');
        setAvatar(userData.avatar || '');
        setSectionValues({
          currentCar: userData.currentCar || '',
          carHistory: userData.carHistory || '',
          expertise: userData.expertise || '',
          interests: userData.interests || '',
        });
        if (userData.bookmarks) {
          const bmPosts = userData.bookmarks
            .map((bm: any) => posts.find(p => p.id === bm.postId))
            .filter((p: any): p is Post => p !== undefined);
          setBookmarkedPosts(bmPosts);
        }
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, [user]);

  const handleSaveBio = async () => {
    setSavingBio(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(user!.username)}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: bioValue.trim() }),
      });
      const data = await res.json();
      if (data.success) setBio(bioValue.trim());
    } catch {}
    setSavingBio(false);
    setEditingBio(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'avatar');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setAvatar(data.data.url);
        await fetch(`/api/users/${encodeURIComponent(user!.username)}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar: data.data.url }),
        });
      }
    } catch {}
    setUploadingAvatar(false);
  };

  const handleSaveSection = async (key: SectionKey) => {
    setSavingSection(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(user!.username)}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: editSectionValue }),
      });
      const data = await res.json();
      if (data.success) {
        setSectionValues(prev => ({ ...prev, [key]: editSectionValue }));
      }
    } catch {}
    setSavingSection(false);
    setEditingSection(null);
  };

  if (loading || !user) {
    return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-text-secondary">加载中...</div>;
  }

  const badge = getBadgeLevel(user.points);
  const lockedFeatures = BADGE_LEVELS.filter(l => l.minPoints > user.points);
  const pointRules = [
    { action: '发帖', points: '+3', icon: '📝' },
    { action: '评论', points: '+1', icon: '💬' },
    { action: '获赞', points: '+1', icon: '❤️' },
    { action: '被收藏', points: '+2', icon: '🔖' },
    { action: '被踩', points: '-1', icon: '💔' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6 pb-20">
      {/* Profile card - editable */}
      <div className="bg-white border border-border rounded-lg overflow-hidden mb-4">
        <div className="h-20 bg-gradient-to-r from-primary to-blue-400" />
        <div className="px-4 pb-4 -mt-8">
          <div className="flex items-end gap-4">
            <div className="border-4 border-white rounded-full shadow relative group">
              <Avatar nickname={user.nickname} points={user.points} size="lg" image={avatar} />
              <input ref={avatarInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" onChange={handleAvatarUpload} className="hidden" />
              <button
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium"
                title="更换头像"
              >
                {uploadingAvatar ? '上传中...' : '📷'}
              </button>
            </div>
            <div className="flex-1 pt-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold">{user.nickname}</h1>
                  <p className="text-sm text-text-secondary">@{user.username}</p>
                </div>
                <Link href={`/u/${user.username}`} className="text-xs text-primary hover:underline">
                  查看公开主页 →
                </Link>
              </div>

              {/* Bio - editable */}
              <div className="mt-2">
                {editingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={bioValue}
                      onChange={(e) => setBioValue(e.target.value)}
                      className="w-full border border-border rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      rows={2} placeholder="介绍一下自己..." autoFocus maxLength={200}
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditingBio(false); setBioValue(bio); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary transition-colors">
                        <XIcon className="w-3.5 h-3.5" /> 取消
                      </button>
                      <button onClick={handleSaveBio} disabled={savingBio}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50">
                        <CheckIcon className="w-3.5 h-3.5" /> {savingBio ? '保存中...' : '保存'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-text-secondary cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => { setEditingBio(true); setBioValue(bio); }}>
                    {bio ? <p className="whitespace-pre-wrap">{bio}</p> : <p className="italic text-text-secondary/60">✏️ 点击添加个人简介</p>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-3 text-sm">
            <div><span className="font-bold">{formatNumber(user.points)}</span><span className="text-text-secondary ml-1">积分</span></div>
            <div><span className="font-bold">{badge.current.icon} {badge.current.name}</span></div>
            <div><span className="font-bold">{userPosts.length}</span><span className="text-text-secondary ml-1">帖子</span></div>
          </div>

          {/* Badge progress */}
          {badge.next && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>{badge.current.icon} {badge.current.name}</span>
                <span>距离 {badge.next.icon} {badge.next.name} 还需 {badge.next.minPoints - user.points} 积分</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${badge.progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile sections - editable */}
      <div className="space-y-3 mb-4">
        {sectionDefs.map(({ key, label, icon, placeholder }) => {
          const value = sectionValues[key];
          const isEditing = editingSection === key;

          return (
            <div key={key} className={`bg-white border border-border rounded-lg p-3 ${!isEditing ? 'cursor-pointer hover:border-primary/40 transition-colors' : ''}`}
              onClick={() => { if (!isEditing) { setEditingSection(key); setEditSectionValue(value); } }}>
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary mb-1.5">
                {icon}<span>{label}</span>
              </div>
              {isEditing ? (
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <textarea value={editSectionValue} onChange={(e) => setEditSectionValue(e.target.value)}
                    className="w-full border border-border rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    rows={3} placeholder={placeholder} autoFocus />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingSection(null)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary transition-colors">
                      <XIcon className="w-3.5 h-3.5" /> 取消
                    </button>
                    <button onClick={() => handleSaveSection(key)} disabled={savingSection}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50">
                      <CheckIcon className="w-3.5 h-3.5" /> {savingSection ? '保存中...' : '保存'}
                    </button>
                  </div>
                </div>
              ) : value ? (
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{value}</p>
              ) : (
                <p className="text-sm text-text-secondary/60 italic">点击添加</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Points guide */}
      <div className="bg-white border border-border rounded-lg overflow-hidden mb-4">
        <div className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <h3 className="font-semibold text-sm">🎮 积分攻略</h3>
        </div>
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {pointRules.map(rule => (
              <div key={rule.action} className="flex items-center gap-1.5 text-xs">
                <span>{rule.icon}</span><span>{rule.action}</span>
                <span className={`font-bold ${rule.points.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>{rule.points}</span>
              </div>
            ))}
          </div>
          {lockedFeatures.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-text-secondary mb-2">待解锁功能</p>
              <div className="space-y-1.5">
                {lockedFeatures.map(level => (
                  <div key={level.name} className="flex items-center gap-2 text-xs bg-secondary/50 rounded-md px-2.5 py-1.5">
                    <span>{level.icon}</span><span className="font-medium">{level.name}</span>
                    <span className="text-text-secondary">{level.minPoints}分</span>
                    <span className="text-text-secondary/60 ml-auto">还需 {level.minPoints - user.points} 分</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-border rounded-lg mb-4">
        <div className="flex">
          {([
            { id: 'posts' as const, label: '帖子', count: userPosts.length },
            { id: 'comments' as const, label: '评论', count: userComments.length },
            { id: 'bookmarks' as const, label: '收藏', count: bookmarkedPosts.length },
          ]).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground'
              }`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'posts' && (
          userPosts.length > 0 ? userPosts.map(post => <PostCard key={post.id} post={post} />) : <p className="text-center text-text-secondary py-8">暂无帖子</p>
        )}
        {activeTab === 'comments' && (
          userComments.length > 0 ? userComments.map(comment => {
            const post = allPosts.find(p => p.id === comment.postId);
            return (
              <Link key={comment.id} href={post ? `/w/${post.community?.slug || 'all'}/post/${post.id}#comments` : '#'}
                className="block bg-white border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-text-secondary">{comment.voteScore} 赞 · {formatRelativeTime(comment.createdAt)}</p>
                  {post && <p className="text-xs text-primary truncate max-w-[200px]">↩ {post.title}</p>}
                </div>
              </Link>
            );
          }) : <p className="text-center text-text-secondary py-8">暂无评论</p>
        )}
        {activeTab === 'bookmarks' && (
          bookmarkedPosts.length > 0 ? bookmarkedPosts.map(post => <PostCard key={post.id} post={post} />) : <p className="text-center text-text-secondary py-8">暂无收藏</p>
        )}
      </div>
    </div>
  );
}
