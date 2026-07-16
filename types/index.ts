// Core data types for 玩车志

export type PostType = 'TEXT' | 'IMAGE' | 'LINK' | 'TRADE';
export type VoteTargetType = 'POST' | 'COMMENT';
export type SortType = 'hot' | 'new' | 'top';

export interface User {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatar?: string;
  points: number;
  bio?: string;
  currentCar?: string;
  carHistory?: string;
  expertise?: string;
  interests?: string;
  createdAt: Date;
}

export interface Community {
  id: string;
  slug: string;
  brand: string;
  code: string;
  displayName: string;
  description?: string;
  postCount: number;
  memberCount: number;
  createdAt: Date;
  createdById: string;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  type: PostType;
  url?: string;
  images?: string[];
  price?: string;
  communityId: string;
  community?: Community;
  authorId: string;
  author?: User;
  voteScore: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  // Client-side state
  userVote?: number; // -1, 0, 1
  userBookmarked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  parentId?: string;
  authorId: string;
  author?: User;
  voteScore: number;
  children?: Comment[];
  createdAt: Date;
  // Client-side state
  userVote?: number;
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string;
  targetType: VoteTargetType;
  value: number; // -1, 0, 3
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Vote scoring rules
export const VOTE_SCORES = {
  UPVOTE: 3,
  DOWNVOTE: -1,
  BOOKMARK: 5,
} as const;

// Point earning rules
export const POINT_RULES = {
  CREATE_POST: 10,
  CREATE_COMMENT: 5,
  CAST_VOTE: 2,
  RECEIVE_UPVOTE: 3,
  DAILY_LOGIN: 5,
} as const;

// Badge levels - 5 levels, each unlocks 1 feature
export const BADGE_LEVELS = [
  { name: '新手上路', minPoints: 0, icon: '🚗', unlock: '浏览、发帖、评论、投票、收藏' },
  { name: '老司机', minPoints: 30, icon: '🏎️', unlock: '编辑/删除自己的帖子' },
  { name: '赛车手', minPoints: 100, icon: '🏁', unlock: '发布交易帖' },
  { name: '车神', minPoints: 300, icon: '👑', unlock: '编辑社区信息' },
  { name: '传奇', minPoints: 800, icon: '⭐', unlock: '管理内容、删除他人帖子' },
] as const;

// Level permissions
export const LEVEL_PERMISSIONS: Record<string, { label: string; permissions: string[] }> = {
  '新手上路': { label: 'Lv.1', permissions: ['浏览', '发帖(图文/纯文/链接)', '评论', '投票', '收藏'] },
  '老司机': { label: 'Lv.2', permissions: ['浏览', '发帖', '评论', '投票', '收藏', '编辑/删除自己的帖子'] },
  '赛车手': { label: 'Lv.3', permissions: ['浏览', '发帖', '评论', '投票', '收藏', '编辑自己的帖子', '发布交易帖'] },
  '车神': { label: 'Lv.4', permissions: ['浏览', '发帖', '评论', '投票', '收藏', '编辑帖子', '交易帖', '编辑社区信息'] },
  '传奇': { label: 'Lv.5', permissions: ['全部权限', '管理内容', '删除他人帖子'] },
};
