import { mockCommunities, mockPosts } from '@/lib/mock-data';
import BrandLogo from '@/components/BrandLogo';
import CommunityTabs from '@/components/CommunityTabs';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

// Brand-specific banner gradients
const bannerGradients: Record<string, string> = {
  '奔驰': 'from-slate-700 via-slate-600 to-slate-800',
  '宝马': 'from-blue-700 via-blue-600 to-indigo-800',
  '奥迪': 'from-gray-800 via-gray-700 to-gray-900',
  '大众': 'from-blue-800 via-blue-700 to-blue-900',
  '丰田': 'from-red-700 via-red-600 to-rose-800',
  '本田': 'from-red-800 via-red-700 to-red-900',
  '日产': 'from-red-600 via-rose-600 to-red-800',
  '马自达': 'from-blue-900 via-indigo-800 to-blue-950',
  '保时捷': 'from-red-700 via-amber-700 to-red-900',
  '斯巴鲁': 'from-blue-600 via-blue-700 to-indigo-900',
  '福特': 'from-blue-800 via-blue-700 to-blue-950',
};

// Inline SVG icons
const PenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const community = mockCommunities.find((c) => c.slug === decodedSlug);
  const communityPosts = mockPosts.filter((p) => p.communityId === community?.id && p.type !== 'TRADE');
  const tradePosts = mockPosts.filter((p) => p.communityId === community?.id && p.type === 'TRADE');
  const hotCommunities = mockCommunities
    .filter((c) => c.id !== community?.id)
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, 5);

  if (!community) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">社区不存在</h1>
        <p className="text-text-secondary mb-6">该社区可能已被删除或尚未创建</p>
        <Link href="/" className="text-primary hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-4 py-4">
      {/* Community header */}
      <div className="bg-white border border-border rounded-lg overflow-hidden mb-4">
        <div className={`h-24 bg-gradient-to-br ${bannerGradients[community.brand] || 'from-primary to-primary-hover'}`} />
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl border-4 border-white shadow-md flex items-center justify-center shrink-0">
              <BrandLogo brand={community.brand} size="md" />
            </div>
            <div className="flex-1 pt-12">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h1 className="text-xl font-bold truncate">w/{community.displayName}</h1>
                  {community.description && (
                    <p className="text-sm text-text-secondary mt-0.5">{community.description}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0 ml-3">
                  <button className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors">
                    加入
                  </button>
                  <Link
                    href={`/submit?community=${community.slug}`}
                    className="flex items-center gap-1 px-4 py-1.5 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <PenIcon className="w-4 h-4" />
                    <span>发帖</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <UsersIcon className="w-3.5 h-3.5 text-text-secondary" />
              <span className="font-bold">{formatNumber(community.memberCount)}</span>
              <span className="text-text-secondary">成员</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileTextIcon className="w-3.5 h-3.5 text-text-secondary" />
              <span className="font-bold">{formatNumber(community.postCount)}</span>
              <span className="text-text-secondary">帖子</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <CommunityTabs
            community={community}
            communityPosts={communityPosts}
            tradePosts={tradePosts}
          />
        </div>

        {/* Community sidebar - Desktop only */}
        <div className="hidden lg:block w-72 shrink-0 space-y-4">
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-primary text-white">
              <h3 className="font-semibold text-sm">关于社区</h3>
            </div>
            <div className="p-4 space-y-3">
              {community.description && (
                <p className="text-sm text-text-secondary">{community.description}</p>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">成员</span>
                <span className="font-medium">{community.memberCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">帖子</span>
                <span className="font-medium">{community.postCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">创建于</span>
                <span className="font-medium">{community.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Hot communities */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-primary text-white">
              <h3 className="font-semibold text-sm">热门社区</h3>
            </div>
            <div className="divide-y divide-border">
              {hotCommunities.map((comm) => (
                <Link
                  key={comm.id}
                  href={`/w/${comm.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <BrandLogo brand={comm.brand} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">w/{comm.displayName}</p>
                    <p className="text-xs text-text-secondary">{formatNumber(comm.memberCount)} 成员</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
