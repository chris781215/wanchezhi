import { readDataFile, writeDataFile } from '@/lib/data-store';

export function loadDynamicPosts(): any[] {
  return readDataFile('posts.json');
}

export function savePost(post: any) {
  const dynamic = loadDynamicPosts();
  const idx = dynamic.findIndex((p: any) => p.id === post.id);
  if (idx >= 0) {
    dynamic[idx] = { ...dynamic[idx], ...post };
  } else {
    dynamic.unshift(post);
  }
  writeDataFile('posts.json', dynamic);
}
