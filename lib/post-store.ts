// Server-only: post persistence to survive hot reload and module isolation
import fs from 'fs';
import path from 'path';

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json');

export function loadDynamicPosts(): any[] {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const raw = fs.readFileSync(POSTS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch { /* ignore */ }
  return [];
}

export function savePost(post: any) {
  try {
    const dynamic = loadDynamicPosts();
    if (!dynamic.find((p: any) => p.id === post.id)) {
      dynamic.unshift(post);
      fs.mkdirSync(path.dirname(POSTS_FILE), { recursive: true });
      fs.writeFileSync(POSTS_FILE, JSON.stringify(dynamic, null, 2));
    }
  } catch { /* ignore in environments without fs */ }
}
