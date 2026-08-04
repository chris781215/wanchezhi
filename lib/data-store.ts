import fs from 'fs';
import path from 'path';

// Detect if filesystem is available (Cloudflare Workers don't have fs)
let fsAvailable = true;
try {
  fs.existsSync('.');
} catch {
  fsAvailable = false;
}

// Safe path join that works even without Node.js path module
function safeJoin(...parts: string[]): string {
  try {
    return path.join(...parts);
  } catch {
    return parts.join('/');
  }
}

// Use /tmp in production (Cloudflare/serverless), local data/ in development
const DATA_DIR = fsAvailable
  ? (process.env.NODE_ENV === 'production'
    ? '/tmp/wcz-data'
    : safeJoin(process.cwd(), 'data'))
  : '/dev/null';

// ============================================================
// Embedded initial data (fallback when fs is unavailable)
// This ensures the site works on Cloudflare Workers where fs doesn't exist.
// Data written at runtime persists in-memory within the same Worker session.
// ============================================================

const INITIAL_USERS: any[] = [
  {
    id: "user-1784590936120",
    email: "chris@163.com",
    username: "chris",
    nickname: "chris",
    avatar: "/avatars/default.png",
    bio: "",
    points: 9999,
    level: 5,
    joinDate: "2026-08-03T23:39:35.214Z",
    isAdmin: true
  }
];

const INITIAL_COMMUNITIES: any[] = [
  {
    id: "comm-1785825298463",
    slug: "w221",
    brand: "奔驰",
    code: "W221",
    displayName: "W221",
    description: "奔驰 W221 (S级 2005-2013) 奔驰鹰眼奔",
    postCount: 0,
    memberCount: 1,
    createdAt: "2026-08-04T06:34:58.463Z",
    createdById: "user-1784590936120"
  },
  {
    id: "comm-1785886566944",
    slug: "e46",
    brand: "宝马",
    code: "E46",
    displayName: "E46",
    description: "测试社区",
    postCount: 0,
    memberCount: 1,
    createdAt: "2026-08-04T23:36:06.944Z",
    createdById: "user-1784590936120"
  }
];

const INITIAL_POSTS: any[] = [
  {
    id: "post-1785825321120",
    title: "绝了",
    content: "绝了",
    type: "IMAGE",
    url: null,
    images: ["/uploads/1785825321093-00iypc.jpeg"],
    price: null,
    communityId: "comm-1785825298463",
    authorId: "user-1784590936120",
    voteScore: 1,
    bookmarkCount: 1,
    commentCount: 2,
    createdAt: "2026-08-04T06:35:21.120Z",
    updatedAt: "2026-08-04T06:35:21.120Z",
    community: {
      id: "comm-1785825298463",
      slug: "w221",
      brand: "奔驰",
      code: "W221",
      displayName: "W221",
      description: "奔驰 W221 (S级 2005-2013) 奔驰鹰眼奔",
      postCount: 0,
      memberCount: 1,
      createdAt: "2026-08-04T06:34:58.463Z",
      createdById: "user-1784590936120"
    },
    author: {
      id: "user-1784590936120",
      nickname: "chris",
      avatar: "/avatars/default.png",
      points: 0,
      username: "chris",
      email: "chris@163.com",
      createdAt: "2026-08-04T06:35:21.103Z"
    }
  }
];

const INITIAL_VOTES: any[] = [
  { id: "vote-1785856924936", userId: "user-1784590936120", targetId: "post-1785825321120", targetType: "post", value: 1, createdAt: "2026-08-04T15:22:04.936Z" },
  { id: "vote-1785856021288", userId: "user-1", targetId: "post-1", targetType: "post", value: 1, createdAt: "2026-08-04T15:07:01.288Z" }
];

const INITIAL_BOOKMARKS: any[] = [
  { id: "bm-1785856928617", userId: "user-1784590936120", postId: "post-1785825321120", createdAt: "2026-08-04T15:22:08.617Z" }
];

const INITIAL_COMMENTS: any[] = [
  { id: "comment-1785825364333", content: "赞", postId: "post-1785825321120", parentId: "comment-1785825356859", authorId: "user-1784590936120", voteScore: 0, createdAt: "2026-08-04T06:36:04.333Z", author: { id: "user-1784590936120", nickname: "chris", avatar: "/avatars/default.png", points: 0 } },
  { id: "comment-1785825356859", content: "赞\n", postId: "post-1785825321120", parentId: null, authorId: "user-1784590936120", voteScore: 0, createdAt: "2026-08-04T06:35:56.859Z", author: { id: "user-1784590936120", nickname: "chris", avatar: "/avatars/default.png", points: 0 } }
];

// Map of filename -> initial data
const INITIAL_DATA: Record<string, any[]> = {
  'users.json': INITIAL_USERS,
  'communities.json': INITIAL_COMMUNITIES,
  'posts.json': INITIAL_POSTS,
  'votes.json': INITIAL_VOTES,
  'bookmarks.json': INITIAL_BOOKMARKS,
  'comments.json': INITIAL_COMMENTS,
};

// In-memory cache for when fs is unavailable (Cloudflare)
const memoryCache: Record<string, any[]> = {};

function ensureDataDir() {
  if (!fsAvailable) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // ignore
  }
}

export function getDataPath(filename: string): string {
  return safeJoin(DATA_DIR, filename);
}

export function readDataFile(filename: string): any[] {
  // If fs is not available (Cloudflare Workers), use memory cache or embedded data
  if (!fsAvailable) {
    if (memoryCache[filename]) {
      return memoryCache[filename];
    }
    // Deep clone initial data to avoid mutation issues
    const initial = INITIAL_DATA[filename] || [];
    memoryCache[filename] = JSON.parse(JSON.stringify(initial));
    return memoryCache[filename];
  }

  // fs available - try reading from disk
  ensureDataDir();
  const filePath = getDataPath(filename);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  // Fallback: try reading from bundled data/ directory
  const bundledPath = safeJoin(process.cwd(), 'data', filename);
  try {
    if (fs.existsSync(bundledPath)) {
      const raw = fs.readFileSync(bundledPath, 'utf-8');
      const data = JSON.parse(raw);
      // Copy to /tmp for future writes
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      } catch {
        // ignore
      }
      return data;
    }
  } catch {
    // ignore
  }

  // Last resort: use embedded initial data
  return JSON.parse(JSON.stringify(INITIAL_DATA[filename] || []));
}

export function writeDataFile(filename: string, data: any): void {
  // Always update in-memory cache (important for Cloudflare)
  memoryCache[filename] = data;

  if (!fsAvailable) return;

  ensureDataDir();
  const filePath = getDataPath(filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch {
    // ignore in environments without writable fs
  }
}
