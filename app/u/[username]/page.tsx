import { mockUsers, mockPosts, mockComments } from '@/lib/mock-data';
import PostCard from '@/components/PostCard';
import UserProfileTabs from '@/components/UserProfileTabs';
import ProfileSections from '@/components/ProfileSections';
import ProfileHeader from '@/components/ProfileHeader';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    return { title: '用户不存在 - 玩车志' };
  }

  return {
    title: `${user.nickname} - 玩车志`,
    description: `${user.nickname} 的个人主页`,
  };
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">用户不存在</h1>
        <Link href="/" className="text-primary hover:underline">返回首页</Link>
      </div>
    );
  }

  const userPosts = mockPosts.filter((p) => p.authorId === user.id);
  const userComments = mockComments.filter((c) => c.authorId === user.id);

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6">
      {/* Profile header */}
      <ProfileHeader
        userId={user.id}
        username={user.username}
        nickname={user.nickname}
        points={user.points}
        postCount={userPosts.length}
        posts={userPosts}
        comments={userComments}
      />

      {/* Profile sections - guided info */}
      <div className="mb-6">
        <ProfileSections userId={user.id} username={user.username} nickname={user.nickname} />
      </div>

      {/* Tabs and content */}
      <UserProfileTabs
        posts={mockPosts}
        userPosts={userPosts}
        comments={userComments}
      />
    </div>
  );
}
