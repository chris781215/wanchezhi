import { mockUsers, mockPosts, mockComments } from '@/lib/mock-data';
import { loadDynamicPosts } from '@/lib/post-store';
import { loadDynamicUsers } from '@/lib/user-store';
import { loadDynamicComments } from '@/lib/comment-store';
import { getUserBookmarks } from '@/lib/bookmark-store';
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

  // Load dynamic users and posts from file store
  const dynamicUsers = loadDynamicUsers();
  dynamicUsers.forEach((du: any) => {
    if (!mockUsers.find((u: any) => u.id === du.id)) mockUsers.push(du);
  });
  const dynamicPosts = loadDynamicPosts();
  const allPosts = [...mockPosts];
  dynamicPosts.forEach((dp: any) => {
    if (!allPosts.find((p) => p.id === dp.id)) {
      dp.createdAt = new Date(dp.createdAt);
      dp.updatedAt = new Date(dp.updatedAt);
      allPosts.push(dp);
    }
  });

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

  // Load dynamic comments
  const dynamicComments = loadDynamicComments();
  const allComments = [...mockComments];
  dynamicComments.forEach((dc: any) => {
    if (!allComments.find((c: any) => c.id === dc.id)) {
      allComments.push({ ...dc, createdAt: new Date(dc.createdAt) });
    }
  });

  const userPosts = allPosts.filter((p) => p.authorId === user!.id);
  const userComments = allComments.filter((c: any) => c.authorId === user!.id);

  // Load user bookmarks
  const bookmarks = getUserBookmarks(user!.id);
  const bookmarkedPosts = bookmarks
    .map((bm) => allPosts.find((p) => p.id === bm.postId))
    .filter((p): p is any => p !== undefined);

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6">
      {/* Profile header */}
      <ProfileHeader
        userId={user!.id}
        username={user!.username}
        nickname={user!.nickname}
        avatar={(user as any).avatar}
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
        posts={allPosts}
        userPosts={userPosts}
        comments={userComments}
        bookmarkedPosts={bookmarkedPosts}
      />
    </div>
  );
}
