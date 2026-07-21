import { mockUsers, mockPosts, mockComments } from '@/lib/mock-data';
import PostCard from '@/components/PostCard';
import UserProfileTabs from '@/components/UserProfileTabs';
import ProfileSections from '@/components/ProfileSections';
import ProfileHeader from '@/components/ProfileHeader';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const user = mockUsers.find((u) => u.username === username);

  return {
    title: `${user?.nickname || username} - 玩车志`,
    description: `${user?.nickname || username} 的个人主页`,
  };
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  let user = mockUsers.find((u) => u.username === username);

  // Auto-create user stub if not found (e.g. after server restart)
  if (!user) {
    const newUser = {
      id: 'user-' + Date.now(),
      email: username.includes('@') ? username : '',
      username,
      nickname: username,
      avatar: '/avatars/default.png',
      bio: '',
      points: 0,
      level: 1,
      joinDate: new Date().toISOString(),
    } as any;
    mockUsers.push(newUser);
    user = newUser;
  }

  const userPosts = mockPosts.filter((p) => p.authorId === user!.id);
  const userComments = mockComments.filter((c) => c.authorId === user!.id);

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6">
      {/* Profile header */}
      <ProfileHeader
        userId={user!.id}
        username={user!.username}
        nickname={user!.nickname}
        points={user!.points}
        postCount={userPosts.length}
        posts={userPosts}
        comments={userComments}
      />

      {/* Profile sections - guided info */}
      <div className="mb-6">
        <ProfileSections userId={user!.id} username={user!.username} nickname={user!.nickname} />
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
